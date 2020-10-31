import React, {useState} from 'react'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import axios from "axios"
import {withRouter} from "next/router"
import {useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message";
import Link from "next/link";
import useUser from "@utils/useUser";


const SignIn = ({router}) => {
    const {register, handleSubmit, errors} = useForm()
    const [commonErrorMessage, setCommonErrorMessage] = useState()


    const onSubmit = (data) => {
        axios.post('/api/signin', {...data})
            .then(async res => {
                router.push("/account")
            })
            .catch((err) => {
                const message = err.response.data.errors[0].message
                message && setCommonErrorMessage(message)
                setCommonErrorMessage(message)
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container fluid className={"pt-5"}>
                <Row sm={3} className={"justify-content-center"}>
                    <Col>
                        <Container fluid>
                            <Card className={"p-3 pt-5 pb-5 shadow"}>
                                <div className={"pb-2"} style={{textAlign: "center"}}>
                                    <div className="logo"/>
                                </div>

                                <h2 className={"pb-5"} style={{textAlign: "center"}}>Авторизация</h2>
                                <div>
                                    {commonErrorMessage && commonErrorMessage}

                                    <ErrorMessage errors={errors} name={"email"}/>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="email">Email</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-label="email"
                                            aria-describedby="email"
                                            name="email"
                                            ref={register({required: "Пожалуйста, укажите email."})}
                                        />
                                    </InputGroup>
                                </div>
                                <div>
                                    <ErrorMessage errors={errors} name={"password"}/>
                                    <InputGroup className="mb-5">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon2">Пароль</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"
                                            name="password"
                                            ref={register({required: "Пожалуйста, укажите пароль."})}
                                        />
                                    </InputGroup>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Button type="submit">Войти</Button>
                                    <div className={"pt-3"}>
                                        <Link href={"/password-reset"}>
                                            <a>Забыли пароль?</a>
                                        </Link>
                                    </div>
                                </div>

                            </Card>
                            <Card className={"p-3 mt-2 shadow text-center"}>
                                <div className={"text-black-50"}>Нет аккаунта?</div>
                                <Link href={"/signup"}>
                                    <a>Зарегистрируйтесь.</a>
                                </Link>
                            </Card>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}


// export default SignIn
export default withRouter(SignIn)