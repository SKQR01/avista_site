import MainWrapper from '@components/MainWrapper'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import {NextSeo} from 'next-seo'

import Quality from "@images/index/medal.svg"
import Empathy from "@images/index/empathy.svg"
import Price from "@images/index/piggybank.svg"
import Exp from "@images/index/experience.svg"

export default function Home() {
    return (
        <>
            <NextSeo
                title={"Ависта"}
                description={"ООО Ависта, бухгалтерское и программное сопровождение вашего бизнеса в Свердловской области"}
                canonical={process.env.HOST_PRODUCTION_URL}
                url={process.env.HOST_PRODUCTION_URL}
                openGraph={{
                    locale:"ru_RU",
                    article:{
                        tags:["Ависта", 'Сопровождение', "Бизнес", "Главная страница"]
                    }
                }}
            />
            <MainWrapper>
                <Container>
                    <Row className={"pb-4"}>
                        <Col sm={6} className={"d-flex align-items-center"}>
                            <div>
                                <h1>ИТЕА</h1>
                                <h3>Программные и бухгалтерские решения для вашего бизнеса.</h3>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div>
                                <img src={"https://via.placeholder.com/400"} className={"content-image"}/>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Container className={"pb-4"}>
                        <Row className={"d-flex align-items-center py-4"}>
                            <Col sm={4} className={"p-2 text-end align-items-center"}>
                                <h2>Заказать наши услуги:</h2>
                            </Col>
                            <Col sm={4}>
                                <Link href={"/ordersForm"}><a className={"link"}><h4>перейти в форму заказа</h4>
                                </a></Link>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                    <Container fluid className={"pb-5"}>
                        <div className={"text-center"}>
                            <h2 className={"pb-3"}>Выбирая нас, вы получаете</h2>
                        </div>

                        <Row>
                            <Col sm={4} className={"p-2 text-center"}>
                                <div className={"p-sm-2 p-md-3 p-lg-5"}>
                                    <img src={Quality} className={"small-content-image"}/>
                                </div>

                                <div className={"d-flex flex-column"}>
                                    <h4>Качественные ПО и бухгалтерские услуги</h4>
                                    <p>Есть над чем задуматься: интерактивные прототипы призывают нас к новым
                                        свершениям,
                                        которые, в свою очередь, должны быть обнародованы.</p>
                                </div>

                            </Col>
                            <Col sm={4} className={"p-2 text-center"}>
                                <div className={"p-sm-2 p-md-3 p-lg-5"}>
                                <img src={Price} className={"small-content-image"}/>
                                </div>
                                <div className={"d-flex flex-column"}>
                                    <h4>Разумные цены</h4>
                                    <p>В целом, конечно, глубокий уровень погружения не даёт нам иного выбора, кроме
                                        определения вывода текущих активов.</p>
                                </div>
                            </Col>

                            <Col sm={4} className={"p-2 text-center"}>
                                <div className={"p-sm-2 p-md-3 p-lg-5"}>
                                    <img src={Empathy} className={"small-content-image"}/>
                                </div>

                                <div className={"d-flex flex-column"}>
                                    <h4>Отзывчивый сервис</h4>
                                    <p>Равным образом, сплочённость команды профессионалов говорит о возможностях
                                        переосмысления внешнеэкономических политик.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                    <Container fluid className={"pb-4"}>
                        <Row className={"d-flex align-items-center"}>
                            <Col sm={12} md={6} className={"p-3 text-center"}>
                                <img src={Exp} className={"big-content-image"}/>
                            </Col>
                            <Col sm={12} md={6} className={"p-2 text-end align-items-center justify-content-sm-center justify-content-sm-center"}>
                                <h2>Опыт компании</h2>
                                <p>Наша компания предоставляет услуги с 2015 года.</p>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                </Container>
            </MainWrapper>
        </>
    )
}
export async function getServerSideProps() {
    return {
        props:{}
    }
}
