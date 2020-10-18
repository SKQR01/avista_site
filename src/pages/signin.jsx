import React from 'react'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

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

    )
}


export default SignIn