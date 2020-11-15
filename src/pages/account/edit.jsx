import React, {useEffect, useState} from 'react'

import FormControl from "react-bootstrap/FormControl"
import {useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import FormCheck from "react-bootstrap/FormCheck"
import axios from "@utils/axios";

import {useRouter} from "next/router"
import MainWrapper from "@components/MainWrapper"
import {redirectIfNotAuth} from "@utils/privateRedirects"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import {emailRegexp, itnRegexp, phoneNumberRegexp} from "@validation/regexps";


const removeEqualsObjectFields = (newObj, oldObj) => {
    const newObjCopy = Object.assign({}, newObj)
    for (let key in newObjCopy) {
        oldObj[key] === newObjCopy[key] && delete newObjCopy[key]
    }
    return newObjCopy
}

const EditAccount = () => {
    const [accountData, setAccountData] = useState()
    const [statuses, setStatuses] = useState()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()

    const [isDataFetching, setIsDataFetching] = useState(true)

    const router = useRouter()

    const {register, handleSubmit, errors, setError, reset} = useForm()

    async function fetchData () {
        setIsDataFetching(true)
        try{
            const resUser = await axios.get("/api/user/account")

            const data = resUser.data.success.payload.user
            setAccountData(data)
            //В react-hook-form нужно конкретное значение(в данном случае речь про статус пользователя, значение которго id), а приходящее значение - объект
            //как следствие, не отображается активный статус пользователя
            reset({
                ...data,
                businessStatus:data.businessStatus._id
            })
            const resUserStatuses = await axios.get("/api/user/businessStatuses")
            setStatuses(resUserStatuses.data.success.payload.userStatuses)
        }catch (e) {
            console.error(e)
        }

        setIsDataFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const onSubmit = (data) => {
        setCommonErrorMessage(null)
        setCommonSuccessMessage(null)

        const filteredData = removeEqualsObjectFields(data, accountData)

        axios.post("/api/user/account", {...filteredData}, {withCredentials: true})
            .then((res) => {
                setCommonSuccessMessage(res.data.success.message)
            })
            .catch(err => {
                if (err.response.data.errors[0].name !== "common") {
                    err.response.data.errors.map(error => setError(error.name, {
                        message: error.message,
                        type: "server"
                    }))
                } else {
                    setCommonErrorMessage(err.response.data.errors[0].message)
                }
            })
    }

    return (
        <MainWrapper>
            <Row className={"justify-content-center align-items-center mt-3"}>
                <Col sm={8} md={7} lg={5}>
                    <Card className={"p-3 pt-5 pb-5 shadow"}>
                        <h1 style={{textAlign: "center", paddingBottom: "2rem"}}>Изменить данные</h1>
                        {
                            isDataFetching ?
                                <div className={"d-flex justify-content-center p-5"}>
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                                :
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Container fluid className={"pb-4"}>
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
                                        <ErrorMessage errors={errors} name={"secondName"}/>
                                        <div className={"pb-3"}>
                                            <b>Фамилия</b>
                                            <FormControl as="input" aria-label="Фамилия"
                                                         name={"secondName"}
                                                         maxLength={"250"}
                                                         placeholder={"Фамилия"}
                                                         ref={register({required: "Введите вашу фамилию."})}

                                            />
                                        </div>

                                        <ErrorMessage errors={errors} name={"firstName"}/>
                                        <div className={"pb-3"}>
                                            <b>Имя</b>
                                            <FormControl as="input" aria-label="Имя"
                                                         name={"firstName"}
                                                         maxLength={"250"}
                                                         placeholder={"Имя"}
                                                         ref={register({required: "Введите ваше имя."})}/>
                                        </div>

                                        <ErrorMessage errors={errors} name={"patronymicName"}/>
                                        <div className={"pb-5"}>
                                            <b>Отчество</b>
                                            <FormControl as="input" aria-label="Отчество"
                                                         name={"patronymicName"}
                                                         maxLength={"250"}
                                                         placeholder={"Отчество"}
                                                         ref={register({required: "Введите ваше отчество."})}/>
                                        </div>
                                        <ErrorMessage errors={errors} name={"businessStatus"}/>
                                        <div className={"pb-3"}>
                                            <b>Статус пользователя</b>
                                            {statuses?.map(status => {
                                                return(
                                                    <FormCheck type="radio" aria-label="ИНН"
                                                               name={"businessStatus"}
                                                               maxLength={"250"}
                                                               key={status._id}
                                                               value={status._id}
                                                               ref={register({required: true})}
                                                               label={status.title}
                                                    />
                                                )
                                            })}
                                        </div>
                                        <ErrorMessage errors={errors} name={"ITN"}/>
                                        <div className={"pb-3"}>
                                            <b>ИНН</b>
                                            <FormControl as="input" aria-label="ИНН"
                                                         name={"ITN"}
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

                                        <ErrorMessage errors={errors} name={"phoneNumber"}/>
                                        <div className={"pb-3"}>
                                            <b>Телефонный номер</b>
                                            <FormControl as="input" aria-label="Телефон"
                                                         name={"phoneNumber"}
                                                         maxLength={"250"}
                                                         placeholder={"Телефонный номер"}
                                                         ref={register({
                                                             required: "Введите ваш сотовый телефон (это необходимо, чтобы связаться с вами).",
                                                             pattern:{
                                                                 value: phoneNumberRegexp,
                                                                 message:"Введённое значение не является телефонным номером.",
                                                             }
                                                         })
                                                         }/>
                                        </div>

                                        <ErrorMessage errors={errors} name={"email"}/>
                                        <div className={"pb-5"}>
                                            <b>Email</b>
                                            <FormControl as="input" aria-label="Почта"
                                                         name={"email"}
                                                         maxLength={"250"}
                                                         placeholder={"Email"}
                                                         ref={register({
                                                             required: "Введите вашу почту (это необходимо, чтобы связаться с вами).",
                                                             pattern:{
                                                                 value: emailRegexp,
                                                                 message:"Введённое значение не является почтовым адресом.",
                                                             }
                                                         })}/>
                                        </div>
                                        <div style={{textAlign: "end"}}>
                                            <Button onClick={router.back}>Назад</Button>
                                            <Button type={"submit"} className={"ml-3"}>Изменить данные</Button>
                                        </div>

                                    </Container>
                                </form>
                        }

                    </Card>
                </Col>
            </Row>
        </MainWrapper>

    )
}

//Обеспечивает приватность
export const getServerSideProps = async (ctx) => redirectIfNotAuth(ctx)

export default EditAccount