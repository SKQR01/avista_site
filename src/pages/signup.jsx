import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"

//Work with forms
import {Form, Formik} from "formik"
import {string, object} from 'yup'

import MainWrapper from "@components/MainWrapper"
import FormControl from "react-bootstrap/FormControl"
import {Container} from "react-bootstrap"


const SignUp = () => {

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: '',
    }

    const validationSchema = object().shape({
        // fullName: string()
        //     .required("*Поле обязательно"),
        // email: string()
        //     .required("*Поле обязательно")
        //     .email("*Здесь должна быть почта"),
        // username: string()
        //     .required("*Поле обязательно"),
        // password: string()
        //     .required("*Поле обязательно"),
        // passwordConfirm: string()
        //     .required("*Поле обязательно"),
        // phoneNumber: string()
        //     .required("*Поле обязательно"),
    })

    return (
        <MainWrapper>
            <Formik
                initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, {resetForm}) => {
                        delete values["passwordConfirm"]
                        await fetch('/api/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(values)
                        })
                        resetForm()
                    }}>

                {({
                      values,
                      handleChange,
                      handleBlur,
                  }) => (
                    <Container fluid>
                        <Form className={"p-3 p-lg-5"}>
                            <h1 className={"pb-3"}>Регистрация</h1>
                            <h3>ФИО</h3>
                            <Row className={"pb-4"}>
                                <Col sm={12} md={8} className={"pb-2"}>
                                    <FormControl as="input" placeholder="ФИО" name={'fullName'}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  value={values.fullName}
                                    />
                                </Col>
                                <Col sm={12} md={6} className={"pb-2"}>
                                    <FormControl as="input" placeholder="Ваш телефон" name={'phoneNumber'}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  value={values.phoneNumber}
                                    />
                                </Col>
                            </Row>

                            <h3>Данные для входа</h3>
                            <Row className={"pb-3"}>
                                <Col sm={12} md={5}>
                                    <div>
                                        <FormControl as="input" className={"mb-2"} placeholder={"E-mail"} name={"email"}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.email}
                                        />
                                    </div>
                                </Col>
                                <Col sm={0} md={7}/>
                                <Col sm={12} md={5}>
                                    <div>
                                        <FormControl as="input" className={"mb-2"} placeholder={"Пароль"} name={"password"}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.password}
                                        />
                                        <FormControl as="input" placeholder={"Подтверждение пароля"} name={"passwordConfirm"}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.passwordConfirm}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className={"justify-content-sm-center justify-content-md-end"}>
                                <Col xs={12} md={3}>
                                    <Button type="submit" className={"w-100"} onSubmit={()=> console.log('asdas')}>Зарегестрироваться</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                )
                }
            </Formik>

        </MainWrapper>
    )
}

export default SignUp