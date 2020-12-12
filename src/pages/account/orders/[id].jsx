import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useRouter} from "next/router"
import axios from "@utils/axios"
import {redirectIfNotAuth} from "@utils/privateRedirects";
import MainWrapper from "@components/MainWrapper";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import FormGroup from "react-bootstrap/FormGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const UserOrder = () => {
    const router = useRouter()
    const [order, setOrder] = useState()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()

    const {register, handleSubmit, errors, reset} = useForm()

    useEffect(() => {
        if (router.query.id) {
            axios.get(`/api/user/orders/${router.query.id}`).then((res) => {
                setOrder(res.data.success.payload.order)
                reset(res.data.success.payload.order)
            }).catch(err => console.error(err))
        }

    }, [router])

    const onSubmit = (data, e) => {
        axios.put(`/api/user/orders/${order._id}`, {...data})
            .then((res) => setCommonSuccessMessage(res.data.success.message))
            .catch(err => {
                const error = err.response.data.errors[0].message
                setCommonErrorMessage(error)
            })
    }

    return (
        <MainWrapper>
            {order ?
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row className={"justify-content-center align-items-center p-3"}>
                    <Col sm={10} md={9}>
                        <Card className={"p-3 pt-5 pb-5 shadow"}>
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
                            <h2><b>Ваш заказ № {order._id}</b></h2>
                            <hr className={"py-1"}/>
                            <div className={"pb-2"}>
                                <h4><b>Статус:</b> {order.status?.title}</h4>
                            </div>
                            <hr className={"py-2"}/>

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
                                                 style={{height: "20vh"}}
                                                 ref={register({required: "Опишите ваш заказ."})}/>
                                </div>
                            </Container>
                            <Container fluid>
                                <Row className="justify-content-md-end text-xs-center text-md-end">


                                    <Col xs={12} md={4} className={"text-sm-center "}>

                                        <ButtonGroup aria-label="order-actions">
                                            <Button onClick={() => router.back()} className={"w-100"}>
                                                Назад
                                            </Button>
                                            <Button type="submit" className={"w-100 ml-md-3"}>Оформить</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </form>:
                <div className={"d-flex justify-content-center p-5"} style={{height:"50vh"}}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }
        </MainWrapper>

    )
}

//Обеспечивает приватность
export const getServerSideProps = async (ctx) => redirectIfNotAuth(ctx)

export default UserOrder

