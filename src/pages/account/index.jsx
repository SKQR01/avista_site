import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Spinner from 'react-bootstrap/Spinner'
import Button from "react-bootstrap/Button"

import axios from "@utils/axios"

import BootstrapTable from 'react-bootstrap-table-next'


import MainWrapper from "@components/MainWrapper"
import {useCallback, useEffect, useState} from "react"

import filterFactory from "react-bootstrap-table2-filter"
import paginationFactory from "react-bootstrap-table2-paginator"
import overlayFactory from 'react-bootstrap-table2-overlay'

import {tableDateFormatter} from "@utils/tableFormatter"
import {useRouter} from "next/router"


import Link from "next/link"
import {redirectIfNotAuth} from "@utils/privateRedirects";
import QuestionHelp from "@components/QuestionHelp";


const columns = [{
    dataField: 'title',
    text: 'Тема',
}, {
    dataField: 'createdAt',
    text: 'Дата заказа',
    formatter: tableDateFormatter
}, {
    dataField: 'status.title',
    text: 'Статус',
}, {
    dataField: 'price',
    text: 'Цена',
}
]


const NoDataIndication = () => {
    return (
        <p>Ваш список заказов до сих пор. Вы можете сделать его <Link href={"/ordersForm"}><a>здесь</a></Link>.</p>
    )
}


const Account = () => {
    const [page, setPage] = useState(1)
    const [userAccount, setUserAccount] = useState()
    const [sizePerPage, setSizePerPage] = useState(10)
    const [orders, setOrders] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [error, setError] = useState(null)
    const router = useRouter()

    const [isUserFetching, setIsUserFetching] = useState(true)
    const [isDataFetching, setIsDataFetching] = useState(true)

    const [node, setNode] = useState()

    async function handleTableChange(type, {page, sizePerPage}) {
        setPage(parseInt(page))
        setSizePerPage(parseInt(sizePerPage))
    }

    async function fetchData() {
        setIsDataFetching(true)
        try {
            const res = await axios.get("/api/user/orders", {
                params: {
                    pageNumber: page,
                    pagination: sizePerPage,
                },
                withCredentials: true,
            })
            setOrders(res.data.success.payload.orders)
            setTotalSize(res.data.success.payload.totalSize)
        } catch(e) {
            console.error(e)
        }
        setIsDataFetching(false)
    }

    async function fetchUser() {
        setIsUserFetching(true)
        try {
            const res = await axios.get("/api/user/account")
            setUserAccount(res.data.success.payload.user)
        }catch(e){
                console.error(e)
        }
        setIsUserFetching(false)

    }

    const removeHandler = () => {
        const removeConfirm = confirm("Вы уверены, что хотите отказаться от указанных заказов?")

        if (removeConfirm) {
            axios.post('/api/user/orders/deleteOrders', {recordsToDelete: node.selectionContext.selected}, {withCredentials: true})
            setOrders(orders => {
                return orders.filter(order => !node.selectionContext.selected.includes(order._id))
            })
        }
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            router.push({pathname: `/account/orders/${row._id}`, query: {id: row._id}})
        },
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        fetchData()
    }, [page, sizePerPage])


    return (
        <MainWrapper>
            <Container className={"p-4"} fluid>
                <Row>
                    <Col md={4} className={"pb-3"}>
                        <Container fluid>
                            <Card>
                                {
                                    isUserFetching
                                        ?
                                        <div className={"d-flex justify-content-center p-5"}>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </div>
                                        :
                                        <>
                                            <Card.Header
                                                as={"h1"}
                                                style={{wordBreak: "break-all"}}
                                            >
                                                <div className={"d-flex justify-content-between"}>
                                                    {userAccount?.secondName} {userAccount?.firstName} {userAccount?.patronymicName}
                                                    <QuestionHelp
                                                        message={"Это ваши данные, вы можете изменить их, при желании."}/>
                                                </div>
                                            </Card.Header>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>E-mail: {userAccount?.email} </ListGroup.Item>
                                                <ListGroup.Item>Телефон: {userAccount?.phoneNumber}</ListGroup.Item>
                                                <ListGroup.Item>
                                                    <div className="d-flex">
                                                        <span> Вы можете поменять свои данные &nbsp;</span>
                                                        <Link href={"/account/edit"}>
                                                            <a className={"link"}>здесь</a>
                                                        </Link>.
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item className={"d-flex flex-column"}>
                                                    <h4>Хотите поменять пароль?</h4>
                                                    <div className="d-flex">
                                                        <span>Вы можете сделать это &nbsp;</span>
                                                        <Link href={"/password-reset"}>
                                                            <a className={"link"}> здесь</a>
                                                        </Link>.
                                                    </div>

                                                </ListGroup.Item>
                                            </ListGroup>
                                        </>
                                }

                            </Card>
                        </Container>
                    </Col>
                    <Col md={8}>
                        <Container fluid>
                            <Card>
                                <Card.Header as={"h3"}>
                                    <div className={"d-flex justify-content-between"}>
                                        Ваши заказы
                                        <QuestionHelp
                                            message={"В этой таблице будут отображаться ваши текущие заказы."}/>
                                    </div>
                                </Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className="d-flex">
                                            <span> Вы можете сделать новый заказ &nbsp;</span>
                                            <Link href={"/ordersForm"}>
                                                <a className={"link"}>здесь</a>
                                            </Link>.
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Row className={"justify-content-end pt-3 px-3"}>
                                    <Col sm={4}>
                                        <Button onClick={removeHandler}>Отказаться от выделенных заказов</Button>
                                    </Col>
                                </Row>

                                <div className="pb-3 px-3">
                                    {
                                        isDataFetching ?
                                            <div className={"d-flex justify-content-center p-5"}>
                                                <Spinner animation="border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            </div>
                                            :
                                            <BootstrapTable
                                                remote
                                                keyField='_id'
                                                bodyClasses={'defis'}
                                                data={orders}
                                                columns={columns}
                                                ref={n => setNode(n)}
                                                hover
                                                rowStyle={{cursor:"pointer"}}
                                                selectRow={
                                                    {
                                                        mode: 'checkbox',
                                                    }
                                                }
                                                rowEvents={rowEvents}
                                                overlay={overlayFactory({
                                                    spinner: true,
                                                    styles: {
                                                        overlay: (base) => ({
                                                            ...base,
                                                            background: 'rgba(206,206,206,0.5)'
                                                        })
                                                    }
                                                })}
                                                filter={filterFactory()}
                                                pagination={paginationFactory({page, sizePerPage, totalSize})}
                                                onTableChange={handleTableChange}
                                                noDataIndication={() => <NoDataIndication/>}
                                            />
                                    }

                                </div>
                            </Card>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </MainWrapper>
    )
}

//Обеспечивает приватность
export const getServerSideProps = async (ctx) => redirectIfNotAuth(ctx)


export default Account