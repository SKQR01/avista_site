import Container from "react-bootstrap/Container"
import FormGroup from "react-bootstrap/FormGroup"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import QuestionHelp from "@components/QuestionHelp"


import MainWrapper from "@components/MainWrapper"
import axios from "@utils/axios"
import {useForm} from "react-hook-form"
import {ErrorMessage} from '@hookform/error-message'

import {useRouter} from "next/router"
import React, {useEffect, useState} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import FormCheck from "react-bootstrap/FormCheck";
import {itnRegexp} from "@validation/regexps";


const OrdersForm = ({cookie}) => {

    const router = useRouter()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [statuses, setStatuses] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()
    const {register, handleSubmit, reset, errors} = useForm()

    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isDataFetching, setIsDataFetching] = useState(true)

    async function fetchData () {
        setIsDataFetching(true)
        try{

            const res = await axios.get("/api/user/businessStatuses")
            setStatuses(res.data.success.payload.userStatuses)
        }catch (e) {
            console.error(e)
        }

        setIsDataFetching(false)
    }
    useEffect(() => {
        fetchData()
    }, [])


    const onSubmit = async (data, e) => {
        setCommonErrorMessage(null)
        setCommonSuccessMessage(null)
        setIsSubmiting(true)
        try {
            const res = await axios.post("/api/user/orders/create", {...data}, {withCredentials: true})
            e.target.reset()
            setCommonSuccessMessage(res.data.success.message)
            if (!cookie) {
                router.push({
                    pathname: "/signin", query: {
                        message: "Вам на почту было выслано письмо с паролем от аккаунта."
                    }
                })
            }
        } catch (e) {

            if (e.response?.data) {
                const error = e.response.data.errors[0].message
                setCommonErrorMessage(error)
            }
            console.error(e)

        }
        setIsSubmiting(false)
    }

    return <MainWrapper>
        {isDataFetching ?
            <div className={"d-flex justify-content-center p-5"}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        :
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container className={"pt-5"}>
                    <h1 className={"pb-3"}>Сделать заказ</h1>
                    {commonSuccessMessage &&
                    <Alert variant={"success"}>
                        {commonSuccessMessage}
                    </Alert>
                    }

                    {commonErrorMessage &&
                    <Alert variant={"danger"}>
                        {commonErrorMessage}
                    </Alert>
                    }
                    <Card className={"p-3 pb-5"}>
                        <FormGroup className={'row g-3'}>
                            <Container className={"d-flex justify-content-end"}>
                                <QuestionHelp
                                    message={"После оформления заказа вам на почту будет выслан пароль от личного кабинета, где вы сможете мониторить свои заказы."}/>
                            </Container>
                            {!cookie &&
                            <Container fluid className={"pb-4"}>
                                <ErrorMessage errors={errors} name={"user.businessStatus"}/>
                                <div className={"pb-3"}>
                                    <b>Ваш статус:</b>
                                    {statuses?.map(status => {
                                        return(
                                            <FormCheck type="radio" aria-label="ИНН"
                                                       name={"user.businessStatus"}
                                                       maxLength={"250"}
                                                       key={status._id}
                                                       value={status._id}
                                                       ref={register({required: "Выберите ваш статус."})}
                                                       label={status.title}
                                            />
                                        )
                                    })}
                                </div>
                                <ErrorMessage errors={errors} name={"user.ITN"}/>
                                <div className={"pb-3"}>
                                    <FormControl as="input" aria-label="ИНН"
                                                 name={"user.ITN"}
                                                 maxLength={"250"}
                                                 placeholder={"ИНН"}
                                                 ref={register({
                                                     required: "Введите ваш ИНН.",
                                                     pattern: {
                                                         value:itnRegexp,
                                                         message:"Введённое значение не является ИНН."
                                                     }
                                                 })
                                                 }

                                    />
                                </div>
                                <h3 className={"pb-3"}>Кто вы?</h3>

                                <ErrorMessage errors={errors} name={"user.secondName"}/>
                                <div className={"pb-3"}>
                                    <FormControl as="input" aria-label="Фамилия"
                                                 name={"user.secondName"}
                                                 maxLength={"250"}
                                                 placeholder={"Фамилия"}

                                                 ref={register({required: "Введите вашу фамилию"})}/>
                                </div>

                                <ErrorMessage errors={errors} name={"user.firstName"}/>
                                <div className={"pb-3"}>
                                    <FormControl as="input" aria-label="Имя"
                                                 name={"user.firstName"}
                                                 maxLength={"250"}
                                                 placeholder={"Имя"}
                                                 ref={register({required: "Введите ваше имя."})}/>
                                </div>

                                <ErrorMessage errors={errors} name={"user.patronymicName"}/>
                                <div className={"pb-5"}>
                                    <FormControl as="input" aria-label="Отчество"
                                                 placeholder={"Отчество"}
                                                 maxLength={"250"}
                                                 name={"user.patronymicName"}
                                                 ref={register({required: "Введите ваше отчество."})}/>
                                </div>


                                <h3 className={"pb-3"}>Контактные данные</h3>
                                <ErrorMessage errors={errors} name={"user.phoneNumber"}/>
                                <div className={"pb-3"}>
                                    <FormControl as="input" aria-label="Телефон"
                                                 name={"user.phoneNumber"}
                                                 maxLength={"250"}
                                                 placeholder={"Телефон"}
                                                 ref={register({required: "Введите ваш сотовый телефон (это необходимо, чтобы связаться с вами)."})}/>
                                </div>

                                <ErrorMessage errors={errors} name={"user.email"}/>
                                <div className={"pb-3"}>
                                    <FormControl as="input" aria-label="Почта"
                                                 name={"user.email"}
                                                 maxLength={"250"}
                                                 placeholder={"Email"}
                                                 ref={register({required: "Введите вашу почту (это необходимо, чтобы связаться с вами)."})}/>
                                </div>



                            </Container>
                            }

                            <Container fluid className={"pb-4"}>
                                <h3 className={"pb-2"}>Ваш заказ:</h3>

                                <ErrorMessage errors={errors} name={"title"}/>
                                <div className={"pb-3"}>
                                    <FormControl as="input" aria-label="Тема заказа"
                                                 name={"title"}
                                                 maxLength={"250"}
                                                 placeholder={"Тема заказа"}
                                                 ref={register({required: "Введите тему заказа"})}/>
                                </div>

                                <ErrorMessage errors={errors} name={"description"}/>
                                <div>
                                    <FormControl as="textarea" aria-label="Описание заказа"
                                                 name={"description"}
                                                 maxLength={"9000"}
                                                 placeholder={"Описание"}
                                                 ref={register({required: "Опишите ваш заказ."})}/>
                                </div>
                            </Container>
                            <Container fluid>
                                <Row className="justify-content-md-end text-xs-center text-md-end">


                                    <Col xs={12} md={4} className={"text-sm-center "}>

                                        <ButtonGroup aria-label="order-actions">
                                            {cookie &&
                                            <Button onClick={() => router.back()} className={"w-100"}>
                                                Назад
                                            </Button>
                                            }
                                            <Button type="submit" disabled={isSubmiting} className={"w-100 ml-md-3"}>{isSubmiting ?
                                                <Spinner animation="border" role="status" size={"sm"}>
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                                : "Оформить"}</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Container>

                        </FormGroup>
                    </Card>
                </Container>
            </form>
        }


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