import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"

import axios from "@utils/axios"


import MainWrapper from "@components/MainWrapper"
import FormControl from "react-bootstrap/FormControl"
import {Container} from "react-bootstrap"
import {useForm} from "react-hook-form"
import React, {useState} from "react"

import {phoneNumberRegexp, emailRegexp, cyrillicOrLateinschriftRegexp, passwordRegexp} from "@validation/regexps"
import {useRouter} from "next/router";
import Alert from "react-bootstrap/Alert";


const SignUp = () => {

    const {register, handleSubmit, watch, errors} = useForm()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()
    const [isFetching, setIsFetching] = useState()

    const password = watch("password")
    const router = useRouter()

    const customErrors = {
        secondName: {
            required: "Укажите свою фамилию.",
            pattern: "Фамилия должна быть написана или кириллицей или латиницей."
        },
        firstName: {
            required: "Укажите своё имя.",
            pattern: "Имя должно быть написано или кириллицей, или латиницей."
        },
        patronymicName: {
            required: "Укажите своё отчество.",
            pattern: "Отчество должно быть написано или кириллицей или латиницей."
        },
        phoneNumber: {
            required: "Укажите телефонный номер.",
            pattern: "Введён недопустимый номер телефона."
        },
        email: {
            required: "Укажите свой email.",
            pattern: "Введённое значение не является адресом электронной почты."
        },
        password: {
            required: "Укажите свой пароль.",
            pattern: "Пароль должен содержать строчные и заглавные латинские буквы с цифрами без пробелов."
        },
        passwordConfirm: {
            required: "Подтвердите пароль.",
            validate: "Пароли должны совпадать."
        },
    }

    const onSubmit = (data) => {
        axios.post("/api/signup", {...data}).then(res => {
            setCommonErrorMessage("")
            setCommonSuccessMessage(res.data.success.message)
            router.push({pathname:"/signin", query:{
                message:"Вам на почту было выслано письмо с паролем от аккаунта."
                }})
        }).catch(err => {
            console.log(err.response.data.errors)
            if (err.response.data.errors[0].name !== "common") {
                err.response.data.errors.map(error => setError(error.name, {message:error.message, type:"server"}))
            } else {
                setCommonErrorMessage(err.response.data.errors[0].message)
            }
        })
    }
    return (
        <MainWrapper>
            <Container fluid>
                <form onSubmit={handleSubmit(onSubmit)} className={"p-3 p-lg-5"}>
                    <h1 className={"pb-3"}>Регистрация</h1>
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
                    <h3>ФИО</h3>
                    <Row className={"pb-4"}>
                        <Col sm={12} md={8} className={"pb-2"}>
                            {customErrors.secondName[errors.secondName?.type] && customErrors.secondName[errors.secondName?.type]}
                            <FormControl as="input" placeholder="Фамилия" name={'secondName'}
                                         maxLength={"250"}
                                         ref={register(
                                             {
                                                 required: true,
                                                 pattern: cyrillicOrLateinschriftRegexp
                                             }
                                         )}
                            />
                        </Col>
                        <Col sm={12} md={8} className={"pb-2"}>
                            {customErrors.firstName[errors.firstName?.type] && customErrors.firstName[errors.firstName?.type]}
                            <FormControl as="input" placeholder="Имя" name={'firstName'}
                                         maxLength={"250"}
                                         ref={register(
                                             {
                                                 required: true,
                                                 pattern: cyrillicOrLateinschriftRegexp
                                             }
                                         )}
                            />
                        </Col>
                        <Col sm={12} md={8} className={"pb-2"}>
                            {customErrors.patronymicName[errors.patronymicName?.type] && customErrors.patronymicName[errors.patronymicName?.type]}
                            <FormControl as="input" placeholder="Отчество" name={'patronymicName'}
                                         maxLength={"250"}
                                         ref={register(
                                             {
                                                 required: true,
                                                 pattern: cyrillicOrLateinschriftRegexp
                                             }
                                         )}
                            />
                        </Col>
                        <Col sm={12} md={6} className={"pb-2"}>
                            {errors.phoneNumber && errors.phoneNumber.message}
                            <FormControl as="input" placeholder="Ваш телефон" name={'phoneNumber'}
                                         maxLength={"250"}
                                         ref={register(
                                             {
                                                 required: true,
                                                 pattern: {
                                                     value: phoneNumberRegexp,
                                                     message: customErrors.phoneNumber.pattern
                                                 }
                                             }
                                         )}
                            />
                        </Col>
                    </Row>

                    <h3>Данные для входа</h3>
                    <Row className={"pb-3"}>
                        <Col sm={12} md={5}>
                            <div>
                                {errors.email && errors.email.message}
                                <FormControl as="input" className={"mb-2"} placeholder={"E-mail"} name={"email"}
                                             maxLength={"250"}
                                             ref={register(
                                                 {
                                                     required: customErrors.email.required,
                                                     pattern: {
                                                         value: emailRegexp,
                                                         message: customErrors.email.pattern
                                                     }
                                                 }
                                             )}
                                />
                            </div>
                        </Col>
                        <Col sm={0} md={7}/>
                        <Col sm={12} md={5}>
                            <div>
                                {customErrors.password[errors.password?.type] && customErrors.password[errors.password?.type]}
                                <FormControl as="input" className={"mb-2"} placeholder={"Пароль"}
                                             maxLength={"250"}
                                             name={"password"}
                                             onInput={(e) => console.log(e.target.value)}
                                             ref={register(
                                                 {
                                                     required: true,
                                                     pattern: {
                                                         value:passwordRegexp,
                                                         message: customErrors.password.pattern
                                                     }
                                                 }
                                             )}
                                />
                                {customErrors.passwordConfirm[errors.passwordConfirm?.type] && customErrors.passwordConfirm[errors.passwordConfirm?.type]}
                                <FormControl as="input" placeholder={"Подтверждение пароля"}
                                             maxLength={"250"}
                                             name={"passwordConfirm"}
                                             ref={register(
                                                 {
                                                     required: true,
                                                     validate: value => value === password
                                                 }
                                             )}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className={"justify-content-sm-center justify-content-md-end"}>
                        <Col xs={12} md={3}>
                            <Button type="submit" className={"w-100"}>Зарегестрироваться</Button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </MainWrapper>
    )
}

export default SignUp