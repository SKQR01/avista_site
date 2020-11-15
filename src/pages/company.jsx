import MainWrapper from "../components/MainWrapper"
import Container from "react-bootstrap/Container";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router"
import map from "@images/company/map.png"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Company = () => {
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
                <Container className={"d-flex p-3"}>
                    <Row>
                        <Col sm={6}>
                            <img alt="company-geolocation" className={"content-image"} src={map}/>
                        </Col>
                        <Col sm={6} className={"d-flex align-items-center p-3"}>
                            <div>
                                <h2>Где нас найти и как связаться.</h2>
                                <p>Адрес: ул. Льва Толстого, 2А, Новоуральск (этаж 1, офис 112)</p>
                                <p>Телефон: +7 (965) 547-66-13</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className={"d-flex flex-column p-3"}>
                    <h1 className={"align-self-center"}>ООО Ависта 1С</h1>
                    <div className={"py-3 px-5"}>
                        <p>
                            ООО «АВИСТА» уже 10 лет является Сервисным Центром компании АО «ПФ «СКБ Контур» в городе
                            Новоуральск
                            Свердловской области. ООО «АВИСТА» занимает лидирующие позиции по распространению на
                            Новоуральском
                            рынке программных продуктов АО «ПФ «СКБ Контур», в сфере защищенного электронного
                            документооборота и
                            облачных сервисов для бизнеса, а также по электронной отчетности через интернет с
                            контролирующими
                            органами.
                        </p>
                        <p>
                            Мы осуществляем деятельность в более чем 300 предприятиях Свердловской области, оказывая
                            услуги по:
                        </p>
                        <ol>
                            <li>
                                Продаже, внедрению, сопровождению и доработке программ бухгалтерского учета, начисления
                                и
                                расчета заработной платы, кадрового делопроизводства, сдачи отчетности в контролирующие
                                органы через интернет и управление предприятием.
                            </li>
                            <li>
                                Ведению бухгалтерского учета и расчета заработной платы, кадрового делопроизводства, а
                                также
                                разработка учетной политики.
                            </li>
                            <li>
                                Учебный центр «АВИСТА» проводит курсы повышения квалификации с выдачей Удостоверения о
                                повышении квалификации, или Диплома о профессиональной переподготовке по направлениям
                                (лицензия № 19253 от 01 февраля 2017 г. Серия 66Л 01 № 0005967):
                                <ul>
                                    <li>
                                        основы бухгалтерского и налогового учета;
                                    </li>
                                    <li>
                                        специалист кадровой службы предприятия;
                                    </li>
                                    <li>
                                        менеджер коммерческого предприятия.
                                    </li>
                                </ul>
                            </li>
                        </ol>
                        <p>


                            Форма обучения: очная, индивидуальная, вечерняя.

                            В 2017 году нам исполнилось 10 лет. В течение этого времени команда профессионалов помогает
                            своим
                            клиентам участвовать в торгах, сдавать отчетность через интернет, вести бизнес и бухгалтерию
                            с
                            помощью современных веб-сервисов.

                            Юбилейный год совпадает с реализацией Федерального закона 54-ФЗ «О применении ККТ». Мы, как
                            всегда,
                            готовы поддержать наших клиентов — в данном случае в этот непростой переходный период на
                            новый
                            порядок работы с ККТ.

                            Обратившись к нам, владельцы касс могут получить разъяснения, как и в какие сроки, выполнить
                            новые
                            требования 54-ФЗ,подключиться к оператору фискальных данных, приобрести товарно-учетную
                            систему.

                            Наше профессиональное кредо — порядочность и компетентность.

                            Специалисты нашей компании всегда готовы выслушать каждого клиента и помочь ему разобраться
                            в
                            потребностях и проблемах, а также предложат оптимальное решение.
                        </p>
                    </div>

                </Container>

            </MainWrapper>
        </>
    )
}

export default Company