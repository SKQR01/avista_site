import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Link from "next/link"


import NavDropdown from "react-bootstrap/NavDropdown"
import {useRouter} from "next/router";


import axios from "@utils/axios"

import franchRed from "@images/franchise/1C_Red.svg"
import avista from "@images/avista.jpg"
import {useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";


const MainNavbar = () => {
    const [user, setUser] = useState()
    const [isFetching, setIsFetching] = useState(true)

    async function logoutHandler() {
        setIsFetching(true)
        try {
            const res = await axios.post("/api/logout", {})
            setUser(undefined)
            router.push("/")

        } catch (e) {
            console.error(e)
        }
        setIsFetching(false)

    }

    async function fetchUser() {
        try {
            const res = await axios.get("/api/user/account", {withCredentials: true})
            setUser(res.data.success.payload.user)
        } catch (e) {
            console.error(e)
        }
        setIsFetching(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])


    const router = useRouter()
    return (
        <Navbar collapseOnSelect expand="lg" style={{boxShadow: "0 0 5px #117382"}}>

            <Container className={""} fluid>
                <Link href={"/"}>
                    <a>
                        <Navbar.Brand className={"navbar-logo"}>
                            <div className={"d-flex align-items-center"}>
                                <img src={franchRed} alt={"1C franchise logo"} className="mr-2 navbar-logo__image"/>
                                ИТЕА
                            </div>


                        </Navbar.Brand>
                    </a>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav " className="justify-content-end">
                    <Container>
                        <Nav className={"w-100 justify-content-md-end main-navbar"}>
                            {/*<NavDropdown title="О компании" id="account"*/}
                            {/*             className={"text-center justify-content-center"}*/}
                            {/*>*/}
                            {/*    <NavDropdown.Item eventKey="company"*/}
                            {/*                      onClick={() => router.push("/company")}>*/}
                            {/*        <a>*/}
                            {/*            Описание*/}
                            {/*        </a>*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item eventKey="requisites"*/}
                            {/*                      onClick={() => router.push("/company/requisites")}>*/}
                            {/*        <a>*/}
                            {/*            Реквизиты*/}
                            {/*        </a>*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                            <Nav.Item>
                                <Link href={"/service"}>
                                    <Nav.Link href={"/service"} className={"main-navbar__item"}>
                                        Услуги
                                    </Nav.Link>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link href={"/products"}>
                                    <Nav.Link href={"/products"} className={"main-navbar__item "}>
                                        Товары
                                    </Nav.Link>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link href={"/ordersForm"}>
                                    <Nav.Link href={"/ordersForm"} className={"main-navbar__item "}>
                                        Сделать заказ
                                    </Nav.Link>
                                </Link>
                            </Nav.Item>

                            <div className={"d-flex mx-md-5 justify-content-center align-items-center"}>
                                {
                                    isFetching ?
                                        <div className={"d-flex justify-content-center"}>
                                            <Spinner animation="border" role="status" size={"sm"}>
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </div> :
                                        user ?
                                            <NavDropdown title="Аккаунт" id="account"
                                                         className={"text-center justify-content-center"}

                                            >
                                                <NavDropdown.Item eventKey="account"
                                                                  onClick={() => router.push("/account")}>
                                                    <a>
                                                        Просмотр
                                                    </a>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item eventKey="accountEdit"
                                                                  onClick={() => router.push("/account/edit")}>
                                                    <a>
                                                        Редактирование
                                                    </a>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item eventKey="accountLogout" onClick={() => logoutHandler()}>
                                                    <a>
                                                        Выйти
                                                    </a>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            :
                                            <Link href={"/signin"}>
                                                <Nav.Link href={"/signin"} className={"main-navbar__item "}>
                                                    Войти
                                                </Nav.Link>
                                            </Link>
                                }
                            </div>
                        </Nav>
                    </Container>
                </Navbar.Collapse>


            </Container>
        </Navbar>
    )
}

export async function getServerSideProps({req, res}) {
    return {
        props: {}
    }
}

export default MainNavbar

