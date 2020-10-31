

import axios from "axios"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import {useForm} from "react-hook-form"
import React, {useState} from "react";


const PasswordReset = () => {
    const {register, handleSubmit, setError} = useForm()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()

    const onSubmit = (data) => {
        axios.post("/api/password-reset", {...data}).then(res => {
            console.log(res.data.success.message)
            setCommonSuccessMessage(res.data.success.message)
        }).catch(error => {
            console.log(error.response.data.errors[0].message)
            setCommonErrorMessage(error.response.data.errors[0].message)
            setTimeout(() => setCommonErrorMessage(null), 3000)
        })
    }

    return (
        <div>
            {commonSuccessMessage && commonSuccessMessage}
            {commonErrorMessage && commonErrorMessage}
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Почта</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="email"
                        name="email"
                        ref={register({required:"Введите почту для сброса пароля."})}
                    />
                </InputGroup>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default PasswordReset