import MainWrapper from "@components/MainWrapper"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

import Container from "react-bootstrap/Container"

import update from "@images/franchise/products/icon_1C-Program-update.png"
import informSystem from "@images/franchise/products/информационная система 1с-итс_color.png"
import contragent from "@images/franchise/products/1с-контрагент_color.png"
import buhg from "@images/franchise/products/1С_Бухгалтерия.svg"
import money from "@images/franchise/products/1С_Зарпалата.svg"
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import Link from "next/link";


const Products = () => {
    const router = useRouter()
    return (
        <>
            <NextSeo
                title={"Ависта 1С Продукты"}
                description={"ООО Ависта, перечень продуктов 1С"}
                canonical={process.env.HOST_PRODUCTION_URL}
                url={`${process.env.HOST_PRODUCTION_URL}${router.pathname}`}
                openGraph={{
                    locale: "ru_RU",
                    article: {
                        tags: ["Ависта", "1С", "Продукция", "Товары"]
                    }
                }}
            />
            <MainWrapper>
                <Container>
                    <h1>Продукты</h1>
                    <Row className={"p-3"}>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card>
                                <Card.Img variant="top" src={update} style={{background: "#54C21A"}}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>1С:Обновление программ</Card.Title>
                                    <Link href={"#"}>
                                        <a className={"link"}>
                                            Куда-то перейти(возможно)
                                        </a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card>
                                <Card.Img variant="top" src={buhg}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>1С:Бухгалтерия</Card.Title>
                                    <Link href="#">
                                        <a className={"link"}>
                                            Куда-то перейти(возможно)
                                        </a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card>
                                <Card.Img variant="top" src={informSystem}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>Информационная система 1С-ИТС</Card.Title>
                                    <Link href="#">
                                        <a className={"link"}>
                                            Куда-то перейти(возможно)
                                        </a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card>
                                <Card.Img variant="top" src={money}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>1С:Зарплата</Card.Title>
                                    <Link href={"#"}>
                                        <a className={"link"}>
                                            Куда-то перейти(возможно)
                                        </a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card>
                                <Card.Img variant="top" src={contragent}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>1С:Контрагент</Card.Title>
                                    <Link href={"#"}>
                                        <a className={"link"}>
                                            Куда-то перейти(возможно)
                                        </a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card>
                                <Card.Img variant="top" src={money}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>1С:Розница</Card.Title>
                                    <Link href="#">
                                        <a className={"text-center link"}>
                                            Куда-то перейти(возможно)
                                        </a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>


            </MainWrapper>
        </>
    )
}

export default Products