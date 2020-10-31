import React, {useEffect, useState} from 'react'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import {useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import axios from "axios";



const removeEqualsObjectFields = (newObj, oldObj) => {
    const newObjCopy = Object.assign({}, newObj)
    for(let key in newObjCopy){
        oldObj[key] === newObjCopy[key] && delete newObjCopy[key]
    }
    return newObjCopy
}

const EditAccount = () => {
    const [accountData, setAccountData] = useState()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()

    const {register, handleSubmit, errors, setError, reset} = useForm()
    useEffect(() => {
        axios.get("/api/user/account", {withCredentials: true}).then(res => {
            setAccountData({...res.data.success.payload.user})
            reset({...res.data.success.payload.user})
        })
    }, [])


    const onSubmit = (data, e) => {
        setCommonErrorMessage(null)
        setCommonSuccessMessage(null)

        const filteredData = removeEqualsObjectFields(data, accountData)

        axios.post("/api/user/account", {...filteredData}, {withCredentials: true})
            .then((res) => {
                setCommonSuccessMessage(res.data.success.message)
            })
            .catch(err => {
                if (err.response.data.errors[0].name !== "common") {
                    err.response.data.errors.map(error => setError(error.name, {message:error.message, type:"server"}))
                } else {
                    setCommonErrorMessage(err.response.data.errors[0].message)
                }
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container fluid className={"pb-4"}>
                <h3 className={"pb-3"}>Кто вы?</h3>
                {commonSuccessMessage && commonSuccessMessage}
                {commonErrorMessage && commonErrorMessage}
                <ErrorMessage errors={errors} name={"secondName"}/>
                <InputGroup className={"pb-3"}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Фамилия</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="input" aria-label="Фамилия"
                                 name={"secondName"}
                                 ref={register({required: "Введите вашу фамилию."})}

                    />
                </InputGroup>

                <ErrorMessage errors={errors} name={"firstName"}/>
                <InputGroup className={"pb-3"}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Имя</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="input" aria-label="Имя"
                                 name={"firstName"}
                                 ref={register({required: "Введите ваше имя."})}/>
                </InputGroup>

                <ErrorMessage errors={errors} name={"patronymicName"}/>
                <InputGroup className={"pb-5"}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Отчество</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="input" aria-label="Отчество"
                                 name={"patronymicName"}
                                 ref={register({required: "Введите ваше отчество."})}/>
                </InputGroup>

                <ErrorMessage errors={errors} name={"phoneNumber"}/>
                <InputGroup className={"pb-3"}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Сотовый телефон</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="input" aria-label="Телефон"
                                 name={"phoneNumber"}
                                 ref={register({required: "Введите ваш сотовый телефон (это необходимо, чтобы связаться с вами)."})}/>
                </InputGroup>

                <ErrorMessage errors={errors} name={"email"}/>
                <InputGroup className={"pb-3"}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="input" aria-label="Почта"
                                 name={"email"}
                                 ref={register({required: "Введите вашу почту (это необходимо, чтобы связаться с вами)."})}/>
                </InputGroup>
                <div><Button type={"submit"}>Изменить данные</Button></div>
            </Container>
        </form>
    )
}

export default EditAccount