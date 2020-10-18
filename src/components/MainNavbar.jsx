import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Link from "next/link"
import Button from "react-bootstrap/Button"
import axios from "axios"
import cookie from "js-cookie"
import {useEffect} from "react"

const MainNavbar = () => {

    return (
        <Navbar collapseOnSelect expand="md" style={{boxShadow: "0 0 5px #117382"}}>
            <Container>
                <Link href={"/"}>
                    <a>
                        <Navbar.Brand className={"navbar-logo"}>
                            <div className="mr-2 navbar-logo__image"/>
                            Ависта 1С
                        </Navbar.Brand>
                    </a>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={"w-100 justify-content-md-end main-navbar"}>
                        <Link href={"/company"}>
                            <Nav.Link href={"/company"} className={"main-navbar__item"}>
                                О компании
                            </Nav.Link>
                        </Link>
                        <Link href={"/service"}>
                            <Nav.Link href={"/service"} className={"main-navbar__item"}>
                                Об услугах
                            </Nav.Link>
                        </Link>
                        <Link href={"/products"}>
                            <Nav.Link href={"/products"} className={"main-navbar__item "}>
                                О товарах
                            </Nav.Link>
                        </Link>
                        <Button onClick={() => axios.post("/api/logout", {}, {withCredentials: true})}>Выйти</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default MainNavbar

