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
              locale:"ru_RU",
              article:{
                  tags:["Услуги", "Ависта", "Сопровождение", "Бизнес"]
              }
          }}
      />
    <MainWrapper>
      <Container className={"pt-3"}>
          <div className={"text-center"}>
              <h1 className={"pb-3"}>Услуги</h1>
          </div>

              <Row className={"py-5"}>
                  <Col sm={4} className={"p-2 text-center"}>
                      <div className={"p-3"}>
                      <img src={Support} className={"content-image"}/>
                      </div>
                      <div className={"d-flex flex-column"}>
                          <h4>Сопровождение</h4>
                          <p>Есть над чем задуматься: интерактивные прототипы призывают нас к новым свершениям,
                              которые, в свою очередь, должны быть обнародованы.</p>
                      </div>

                  </Col>
                  <Col sm={4} className={"p-2 text-center"}>
                      <div className={"p-3"}>
                      <img src={Integr} className={"content-image"}/>
                      </div>
                      <div className={"d-flex flex-column"}>
                          <h4>Внедрение</h4>
                          <p>В целом, конечно, глубокий уровень погружения не даёт нам иного выбора, кроме
                              определения вывода текущих активов.</p>
                      </div>
                  </Col>

                  <Col sm={4} className={"p-2 text-center"}>
                      <div className={"p-3"}>
                          <img src={Repair} className={"content-image"}/>
                      </div>

                      <div className={"d-flex flex-column"}>
                          <h4>Восстановление</h4>
                          <p>Равным образом, сплочённость команды профессионалов говорит о возможностях
                              переосмысления внешнеэкономических политик.</p>
                      </div>
                  </Col>
              </Row>
          <hr/>

          <Row className={"py-5"}>
              <Col sm={6} className={"d-flex align-items-center"}>
                  <div>
                      <h3>Продажа и настройка программных продуктов 1С</h3>
                      <p>Список которых вы можете посмотреть <Link href={"/products"}><a className={"link"}>здесь</a></Link>.</p>
                  </div>
              </Col>
              <Col sm={6}>
                  <div>
                      <img src={cProduct} className={"content-image"}/>
                  </div>
              </Col>
          </Row>
          <hr/>
          <Row className={"py-5"}>
              <Col sm={6}>
                  <div>
                      <img src={Protect} className={"content-image"}/>
                  </div>
              </Col>
              <Col sm={6} className={"d-flex align-items-center"}>
                  <div>
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
    </MainWrapper>
          </>
  )
}

export default Service