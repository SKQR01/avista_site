import Container from "react-bootstrap/Container"
import FormGroup from "react-bootstrap/FormGroup"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"


import MainWrapper from "@components/MainWrapper"
import axios from "axios"
import {useForm} from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'

import {useRouter} from "next/router"
import {useState} from "react";


const OrdersForm = ({cookie}) => {

    const router = useRouter()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()
    const {register, handleSubmit, setError, errors} = useForm()

    const onSubmit = (data, e) => {
        let requestState = {
            ...data,
        }
        setCommonErrorMessage(null)
        setCommonSuccessMessage(null)
        axios.post("/api/user/orders/create", {...data}, {withCredentials: true})
            .then((res) => {
                e.target.reset()
                setCommonSuccessMessage(res.data.success.message)
            })
            .catch(err => {
                const error = err.response.data.errors[0].message
                setCommonErrorMessage(error)
            })
    }


    return <MainWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className={"pt-5"}>
                <h1 className={"pb-3"}>Сделать заказ</h1>
                {commonErrorMessage && commonErrorMessage}
                {commonSuccessMessage && commonSuccessMessage}
                <Card className={"p-3 pb-5"}>
                    <FormGroup className={'row g-3'}>
                        {!cookie &&
                        <Container fluid className={"pb-4"}>
                            <h3 className={"pb-3"}>Кто вы?</h3>

                            <ErrorMessage errors={errors} name={"user.secondName"}/>
                            <InputGroup className={"pb-3"}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Фамилия</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="input" aria-label="Фамилия"
                                             name={"user.secondName"}
                                             ref={register({required: "Введите вашу фамилию"})}/>
                            </InputGroup>

                            <ErrorMessage errors={errors} name={"user.firstName"}/>
                            <InputGroup className={"pb-3"}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Имя</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="input" aria-label="Имя"
                                             name={"user.firstName"}
                                             ref={register({required: "Введите ваше имя."})}/>
                            </InputGroup>

                            <ErrorMessage errors={errors} name={"user.patronymicName"}/>
                            <InputGroup className={"pb-5"}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Отчество</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="input" aria-label="Отчество"
                                             name={"user.patronymicName"}
                                             ref={register({required: "Введите ваше отчество."})}/>
                            </InputGroup>

                            <ErrorMessage errors={errors} name={"user.phoneNumber"}/>
                            <InputGroup className={"pb-3"}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Сотовый телефон</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="input" aria-label="Телефон"
                                             name={"user.phoneNumber"}
                                             ref={register({required: "Введите ваш сотовый телефон (это необходимо, чтобы связаться с вами)."})}/>
                            </InputGroup>

                            <ErrorMessage errors={errors} name={"user.email"}/>
                            <InputGroup className={"pb-3"}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Email</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="input" aria-label="Почта"
                                             name={"user.email"}
                                             ref={register({required: "Введите вашу почту (это необходимо, чтобы связаться с вами)."})}/>
                            </InputGroup>
                        </Container>
                        }

                        <Container fluid className={"pb-4"}>
                            <h3 className={"pb-2"}>Ваш заказ:</h3>

                            <ErrorMessage errors={errors} name={"title"}/>
                            <InputGroup className={"pb-3"}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Тема заказа</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="input" aria-label="Тема заказа"
                                             name={"title"}
                                             ref={register({required: "Введите тему заказа"})}/>
                            </InputGroup>

                            <ErrorMessage errors={errors} name={"description"}/>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Описание</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="Описание заказа"
                                             name={"description"}
                                             ref={register({required: "Опишите ваш заказ."})}/>
                            </InputGroup>
                        </Container>
                        <Container fluid>
                            <Row className="justify-content -md-end">
                                <Col sm={12} md={4} className="justify-content-md-center">
                                    <Button type="submit" className={"w-100"}>Отправить заявку</Button>
                                </Col>
                            </Row>
                        </Container>

                    </FormGroup>
                </Card>
            </Container>
        </form>

    </MainWrapper>
}

export async function getServerSideProps(ctx) {
    if (ctx.req) {
        axios.defaults.headers.get.Cookie = ctx.req.headers.cookie
    }
    const {cookie} = ctx.req.headers

    return {
        props: {
            cookie: cookie || ''
        }
    }
}

export default OrdersForm