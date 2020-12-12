import MainWrapper from "@components/MainWrapper"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

import Container from "react-bootstrap/Container"

import update from "@images/franchise/products/ticket-box.svg"
// import informSystem from "@images/franchise/products/snow-globe.svg"
import informSystem from "@images/franchise/products/money.svg"
import contragent from "@images/franchise/products/1с-контрагент_color.png"
import buhg from "@images/franchise/products/snow-globe.svg"
import money from "@images/franchise/products/book.svg"
import franchise from "@images/franchise/1C_Red.svg"
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
                    <Row className={"p-3 pt-5"}>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card className={"w-75 shadow"}>
                                <Card.Img variant="top" src={franchise} className={"p-sm-3 pt-sm-4 p-md-4 pt-lg-5"}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>Программные продукты и настройки, предназначенныедля использования с продуктами 1С</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card className={"w-75 shadow"}>
                                <Card.Img variant="top" src={money} className={"p-3"}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>Образовательные программные продукты фирмы 1С</Card.Title>
                                    <Link href={"/products/education"}>
                                        <a className={"link"}>Просмотреть</a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card className={"w-75 shadow"}>
                                <Card.Img variant="top" className={"p-3"} src={informSystem}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>Программы делового назначения</Card.Title>
                                    <Link href={"/products/business"}>
                                        <a className={"link"}>Просмотреть</a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card className={"w-75 shadow"}>
                                <Card.Img variant="top" src={update} className={"p-3"}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>Торговое оборудование</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} className={"product-card p-3"}>
                            <Card className={"w-75 shadow"}>
                                <Card.Img variant="top" src={buhg}/>
                                <Card.Body className={"text-center"}>
                                    <Card.Title>Сувениры</Card.Title>
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