import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router"

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

import {useForm} from "react-hook-form"

import axios from "axios"


const PasswordResetHash = () => {
    const router = useRouter()
    const {register, handleSubmit, watch, errors} = useForm()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()
    const newPassword = watch("newPassword")


    const onSubmit = (data, e) => {
        axios.post("/api/password-reset/confirmation", {
            ...data,
            hash: router.query.hash
        }).then(res => {
            setCommonSuccessMessage(res.data.success.message)
        }).catch(error => {
            setCommonErrorMessage(error.response.data.errors[0].message)
            setCommonErrorMessage(null)
        })
    }

    const newErrors = {
        newPassword: {
            required: "Введите новый пароль.",
            minLength: "Пароль слишком короткий.",
            pattern: "Слишком простой пароль (пароль должен содержать цифры, а также латинские буквы верхнего и нижнего регистра)."
        },
        newPasswordConfirm: {
            required: "Подтвердите новый пароль.",
            validate: "Пароли должны совпадать."
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {commonSuccessMessage && commonSuccessMessage}
            {commonErrorMessage && commonErrorMessage}
            {newErrors.newPassword[errors.newPassword?.type] && newErrors.newPassword[errors.newPassword?.type]}
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>Новый пароль</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    as={"input"}
                    aria-label="newPassword"
                    name="newPassword"
                    ref={register(
                        {
                            required: true,
                            minLength: 5,
                            pattern: /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/
                        }
                    )}
                />
            </InputGroup>

            {newErrors.newPasswordConfirm[errors.newPasswordConfirm?.type] && newErrors.newPasswordConfirm[errors.newPasswordConfirm?.type]}
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>Подтверждение</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    as={"input"}
                    ref={register(
                        {
                            required: true,
                            validate: (value) => {
                                return value === newPassword
                            }
                        }
                    )}
                    aria-label="newPasswordConfirm"
                    name="newPasswordConfirm"
                />
            </InputGroup>
            <button type="submit">Submit</button>
        </form>
    )
}

export default PasswordResetHash