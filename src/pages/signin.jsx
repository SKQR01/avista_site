<<<<<<< HEAD
import React from 'react'
=======
import React, {useState} from 'react'
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

<<<<<<< HEAD
//Work with forms
import {Form, Formik} from "formik"
import string from 'yup/lib/string'
import object from 'yup/lib/object'
import axios from "axios"


const SignIn = () => {

    const initialValues = {
        mailOrUsername: '',
        password: ''
    }

    const validationSchema = object().shape({
        mailOrUsername: string()
            .required("*Поле обязательно"),
        password: string()
            .required("*Поле обязательно"),
    })

    return (
        <Formik initialValues={initialValues}
            // validationSchema={validationSchema}
                onSubmit={async (values, {resetForm}) => {
                    await axios.post('/api/signin', {
                        values
                    })

                    await resetForm()
                }}>

            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Container fluid className={"pt-5"}>
                        <Row sm={3} className={"justify-content-center"}>
                            <Col>
                                <Container fluid>
                                    <Card className={"p-3 pt-5 pb-5 shadow"}>
                                        <div className={"pb-2"} style={{textAlign: "center"}}>
                                            <div className="logo"/>
                                        </div>
                                        <h2 className={"pb-5"} style={{textAlign: "center"}}>Авторизация</h2>
                                        {touched.mailOrUsername && errors.mailOrUsername ? (
                                            <div className="error-message">{errors.mailOrUsername}</div>
                                        ) : null}
                                        <InputGroup className="mb-3">

                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">L | M</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                aria-label="Username or email"
                                                aria-describedby="basic-addon1"
                                                name="mailOrUsername"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mailOrUsername}
                                                className={touched.mailOrUsername && errors.mailOrUsername ? "error" : null}
                                            />

                                        </InputGroup>
                                        <InputGroup className="mb-5">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon2">Пароль</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            {touched.password && errors.password ? (
                                                <div className="error-message">{errors.password}</div>
                                            ) : null}
                                            <FormControl
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className={touched.password && errors.password ? "error" : null}
                                            />
                                        </InputGroup>
                                        <div style={{textAlign: "center"}}>
                                            <Button type="submit">Войти</Button>
                                        </div>
                                    </Card>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            )}
        </Formik>

=======
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
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    )
}


<<<<<<< HEAD
export default SignIn
=======
// export default SignIn
export default withRouter(SignIn)
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
