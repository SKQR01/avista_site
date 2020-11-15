import MainWrapper from "@components/MainWrapper"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

import Repair from "@images/service/update.svg"
import Integr from "@images/service/integration.svg"
import Protect from "@images/service/protection.svg"
import Support from "@images/service/technical-support.svg"
import cProduct from "@images/franchise/1C_Red.svg"
import Finalize from "@images/service/to-do-list.svg"
import Software from "@images/service/software.svg"
import Web from "@images/service/web.svg"
import Buh from "@images/service/buh.svg"

import Link from "next/link";


const Service = () => {
    const router = useRouter()
    return (
        <>
            <NextSeo
                title={"Ависта Услуги"}
                description={"ООО Ависта, описание предоставляемых услуг"}
                canonical={process.env.HOST_PRODUCTION_URL}
                url={`${process.env.HOST_PRODUCTION_URL}${router.pathname}`}
                openGraph={{
                    locale: "ru_RU",
                    article: {
                        tags: ["Услуги", "Ависта", "Сопровождение", "Бизнес"]
                    }
                }}
            />
            <MainWrapper>
                <div className={"mx-lg-5"}>
                    <Container className={"p-5"} fluid>
                        <div className={"py-5"}>
                            <Row>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Integr} className={"small-content-image"}/>
                                    </div>
                                    <div className={"d-flex flex-column"}>
                                        <h4>Внедрение</h4>
                                        <p>В целом, конечно, глубокий уровень погружения не даёт нам иного выбора, кроме
                                            определения вывода текущих активов.</p>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Support} className={"small-content-image"}/>
                                    </div>
                                    <div className={"d-flex flex-column"}>
                                        <h4>Сопровождение</h4>
                                        <p>Есть над чем задуматься: интерактивные прототипы призывают нас к новым
                                            свершениям,
                                            которые, в свою очередь, должны быть обнародованы.</p>
                                    </div>

                                </Col>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Repair} className={"small-content-image"}/>
                                    </div>

                                    <div className={"d-flex flex-column"}>
                                        <h4>Восстановление</h4>
                                        <p>Равным образом, сплочённость команды профессионалов говорит о возможностях
                                            переосмысления внешнеэкономических политик.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Finalize} className={"small-content-image"}/>
                                    </div>

                                    <div className={"d-flex flex-column"}>
                                        <h4>Доработка 1С</h4>
                                        <p>Идейные соображения высшего порядка, а также перспективное планирование, в своём
                                            классическом представлении, допускает внедрение модели развития.</p>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Software} className={"small-content-image"}/>
                                    </div>

                                    <div className={"d-flex flex-column"}>
                                        <h4>Разработка ПО</h4>
                                        <p>Также как семантический разбор внешних противодействий влечет за собой процесс
                                            внедрения и модернизации своевременного выполнения сверхзадачи!</p>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Web} className={"small-content-image"}/>
                                    </div>

                                    <div className={"d-flex flex-column"}>
                                        <h4>Разработка сайтов</h4>
                                        <p>Также как укрепление и развитие внутренней структуры влечет за собой процесс
                                            внедрения и модернизации благоприятных перспектив.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={"justify-content-center"}>
                                <Col sm={6} md={4} className={"p-2 text-center"}>
                                    <div className={"p-3 p-lg-5"}>
                                        <img src={Buh} className={"small-content-image"}/>
                                    </div>

                                    <div className={"d-flex flex-column"}>
                                        <h4>Бухучёт</h4>
                                        <p>Также как укрепление и развитие внутренней структуры влечет за собой процесс
                                            внедрения и модернизации благоприятных перспектив.</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>



                        <hr/>

                        <Row className={"py-5"}>
                            <Col sm={6} className={"d-flex align-items-center"}>
                                <div className={"text-sm-center text-md-right p-3 pb-4"}>
                                    <h3>Продажа и настройка программных продуктов 1С</h3>
                                    <p>Список которых вы можете посмотреть <Link href={"/products"}><a
                                        className={"link"}>здесь</a></Link>.</p>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={"d-flex w-100 h-100 justify-content-center align-center"}>
                                    <img src={cProduct} className={"big-content-image"}/>
                                </div>
                            </Col>
                        </Row>

                        <hr/>
                        <Row className={"py-5"}>
                            <Col sm={6}>
                                <div className={"pb-5 p-2 text-center w-100"}>
                                    <img src={Protect} className={"big-content-image"}/>
                                </div>
                            </Col>
                            <Col sm={6} className={"pb-5 d-flex align-items-center "}>
                                <div className={"text-sm-center text-md-left w-100"}>
                                    <h3>Продажа антивирусных и программных продуктов делового назначения</h3>
                                </div>
                            </Col>
                        </Row>
                        <hr/>
                        <Container fluid className={"pb-4"}>
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
                    </Container>
                </div>

            </MainWrapper>
        </>
    )
}

export default Service