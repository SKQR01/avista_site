import MainWrapper from "@components/MainWrapper"
import Container from "react-bootstrap/Container";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router"
import map from "@images/company/map.png"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Index = () => {
    const router = useRouter()
    return (
        <>
            <NextSeo
                title={"О компании"}
                description={"ООО Ависта, о компании"}
                canonical={process.env.HOST_PRODUCTION_URL}
                url={`${process.env.HOST_PRODUCTION_URL}${router.pathname}`}
                openGraph={{
                    locale:"ru_RU",
                    article:{
                        tags:["Биография", "Ависта", "Хронология", "История"]
                    }
                }}
            />
            <MainWrapper>
                <Container>
                    <Container className={"d-flex p-3"}>
                        <Row>
                            <Col sm={12} className={"d-flex justify-content-center align-items-center text-center p-3"}>
                                <div>
                                    <h2>Где нас найти и как связаться.</h2>
                                    <p>Адрес: ул. Льва Толстого, 2А, Новоуральск (этаж 1, офис 112)</p>
                                    <p>Телефон: +7 (965) 547-66-13</p>
                                </div>
                            </Col>
                            <Col className="d-flex justify-content-center" sm={12}>
                                <div className="w-50">
                                    <img alt="company-geolocation" className={"content-image"} src={map}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </Container>


            </MainWrapper>
        </>
    )
}

export default Index