import Container from "react-bootstrap/Container"
import FormGroup from "react-bootstrap/FormGroup"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"


<<<<<<< HEAD
//Work with forms
import {Field, Form, Formik} from "formik"
import string from 'yup/lib/string'
import object from 'yup/lib/object'

import MainWrapper from "@components/MainWrapper"
import axios from "axios"



const genereteDocuments = async () => {
    const title = ['Короткий заголовок', 'Заголовок подлиньше', 'Длинный заголовок']
    const description = ['Какое-то короткое описание', 'Описание подлиньше', 'Длинное описание']
    const monitorsResolutionsAdaptivity = ['ПК', 'Ноутбуки', 'Планшеты', 'Смартфоны']

    for (let i = 0; i < 25; i++) {
        const data = {
            title: title[Math.floor(Math.random() * title.length)],
            monitorsResolutionsAdaptivity: [monitorsResolutionsAdaptivity[Math.floor(Math.random() * monitorsResolutionsAdaptivity.length)], monitorsResolutionsAdaptivity[Math.floor(Math.random() * monitorsResolutionsAdaptivity.length)]],
            description: description[Math.floor(Math.random() * description.length)],
        }
        const res = await axios.post("http://localhost:3000/api/orders", data, {withCredentials: true})

    }
}

const OrdersForm = ({cookie}) => {

    const initialValues = {
        title: '',
        monitorsResolutionsAdaptivity: [],
        description: '',
        user: {
            firstName: '',
            secondName: '',
            patronymicName: '',
            email: '',
            phoneNumber: '',
        }
    }

    const validationSchema = object().shape({
        title: string()
            .required("*Поле обязательно"),
        // monitorsResolutionsAdaptivity: [],
        description: string()
            .required("*Поле обязательно"),
        firstName: string()
            .required("*Поле обязательно"),
        secondName: string()
            .required("*Поле обязательно"),
        patronymicName: string()
            .required("*Поле обязательно"),
        email: string()
            .required("*Поле обязательно"),
        phoneNumber: string()
            .required("*Поле обязательно"),
    })

    return <MainWrapper>
        <Formik
            initialValues={initialValues}
            onSubmit={
                async (values, {resetForm}) => {
                    const requestState = {
                        ...values,
                        user: {
                            ...values.user,
                            fullName: `${values.user.firstName} ${values.user.secondName} ${values.user.patronymicName}`
                        }
                    }

                    delete requestState.user["firstName"]
                    delete requestState.user["secondName"]
                    delete requestState.user["patronymicName"]


                    axios.post("/api/orders/user/create", {...requestState}, {withCredentials: true}).then(res => {
                        resetForm()
                    })
                }
            }
        >
            {({values, handleChange, handleBlur, handleSubmit}) => (
                <Form>
                    <Container className={"pt-5"}>
                        <h1 className={"pb-3"}>Сделать заказ</h1>
                        <Card className={"p-3 pb-5"}>
                            <FormGroup className={'row g-3'}>
                                {!cookie &&
                                <Container fluid className={"pb-4"}>
                                    <h3 className={"pb-3"}>Кто вы?</h3>
                                    <InputGroup className={"pb-3"}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Фамилия</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="input" aria-label="Фамилия" value={values.user.firstName}
                                                     onChange={handleChange} onBlur={handleBlur}
                                                     name={"user.firstName"}/>
                                    </InputGroup>
                                    <InputGroup className={"pb-3"}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Имя</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="input" aria-label="Имя" value={values.user.secondName}
                                                     onChange={handleChange} onBlur={handleBlur}
                                                     name={"user.secondName"}/>
                                    </InputGroup>
                                    <InputGroup className={"pb-5"}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Отчество</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="input" aria-label="Отчество" value={values.user.patronymicName}
                                                     onChange={handleChange} onBlur={handleBlur}
                                                     name={"user.patronymicName"}/>
                                    </InputGroup>
                                    <InputGroup className={"pb-3"}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Сотовый телефон</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="input" aria-label="Телефон" value={values.user.phoneNumber}
                                                     onChange={handleChange} onBlur={handleBlur}
                                                     name={"user.phoneNumber"}/>
                                    </InputGroup>
                                    <InputGroup className={"pb-3"}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Email</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="input" aria-label="Почта" value={values.user.email}
                                                     onChange={handleChange} onBlur={handleBlur} name={"user.email"}/>
                                    </InputGroup>
                                </Container>
                                }

                                <Container fluid className={"pb-4"}>
                                    <h3 className={"pb-2"}>Ваш заказ:</h3>
                                    <InputGroup className={"pb-3"}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Тема заказа</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="input" aria-label="Тема заказа" value={values.title}
                                                     onChange={handleChange} onBlur={handleBlur} name={"title"}/>
                                    </InputGroup>

                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Описание</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="textarea" aria-label="Описание заказа"
                                                     value={values.description} onChange={handleChange}
                                                     onBlur={handleBlur} name={"description"}/>
                                    </InputGroup>
                                </Container>
                                <Container fluid className={"d-flex flex-column pb-4"}>
                                    <h3 className={"pb-2"}>Адаптировать дизайн для:</h3>
                                    <label>
                                        <Field type={"checkbox"} value={"ПК"} name={"monitorsResolutionsAdaptivity"}
                                               onChange={handleChange} onBlur={handleBlur}/>
                                        ПК
                                    </label>
                                    <label>
                                        <Field type={"checkbox"} value={"Ноутбуки"}
                                               name={"monitorsResolutionsAdaptivity"} onChange={handleChange}
                                               onBlur={handleBlur}/>
                                        Ноутбуки
                                    </label>
                                    <label>
                                        <Field type={"checkbox"} value={"Планшеты"}
                                               name={"monitorsResolutionsAdaptivity"} onChange={handleChange}
                                               onBlur={handleBlur}/>
                                        Планшеты
                                    </label>
                                    <label>
                                        <Field type={"checkbox"} value={"Смартфоны"}
                                               name={"monitorsResolutionsAdaptivity"} onChange={handleChange}
                                               onBlur={handleBlur}/>
                                        Смартфоны
                                    </label>
                                </Container>
                                <Container fluid>
                                    <Row className="justify-content-md-end">
                                        <Col sm={12} md={4} className="justify-content-md-center">
                                            <Button type="submit" className={"w-100"}>Отправить заявку</Button>
                                            {/*<Button onClick={genereteDocuments} className={"w-100"}>Генерировать*/}
                                            {/*    заявки</Button>*/}
                                        </Col>
                                    </Row>
                                </Container>

                            </FormGroup>
                        </Card>
                    </Container>
                </Form>
            )
            }
        </Formik>
=======
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

>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    </MainWrapper>
}

export async function getServerSideProps(ctx) {
    if (ctx.req) {
<<<<<<< HEAD
        // it runs on server side
        axios.defaults.headers.get.Cookie = ctx.req.headers.cookie
    }
    const {cookie} = ctx.req.headers
=======
        axios.defaults.headers.get.Cookie = ctx.req.headers.cookie
    }
    const {cookie} = ctx.req.headers

>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    return {
        props: {
            cookie: cookie || ''
        }
    }
}

export default OrdersForm