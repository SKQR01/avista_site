import React from 'react'
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
    return (

        <Card className={"d-flex flex-sm-column flex-md-row footer shadow p-3"}>
            <div className={"d-flex align-items-center justify-content-center text-center w-100 p-3"}>
                624130
                <br/>
                Свердловская область, г. Новоуральск, ул. Фрунзе 7 - офис 204
            </div>
            <div className={"d-flex align-items-center justify-content-center text-center w-100 p-3"}>
                8(34370) 7-87-87
                <br/>
                whatsapp: +7(965)547-66-13
                <br/>
                avista-1c@yandex.ru
            </div>


        </Card>

    )
}

export default Footer