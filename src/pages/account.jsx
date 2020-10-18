import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import axios from "axios"

import BootstrapTable from 'react-bootstrap-table-next'
import withPrivatePage from "@hocs/withPrivatePage"


import MainWrapper from "@components/MainWrapper"
import {useCallback, useEffect, useState} from "react";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Spinner from "react-bootstrap/Spinner";


const products = [
    {
        title: "Какой-то заказ",
        date: "20.09.2020",
        status: "Не подтверждён",
        price: 20
    },
    {
        title: "Какой-то заказ",
        date: "15.09.2020",
        status: "Не подтверждён",
        price: 20
    },
    {
        title: "Какой-то заказ",
        date: "12.09.2020",
        status: "Не подтверждён",
        price: 20
    },
];
const columns = [{
    dataField: 'title',
    text: 'Тема'
}, {
    dataField: 'date',
    text: 'Дата заказа'
}, {
    dataField: 'status',
    text: 'Статус'
}, {
    dataField: 'price',
    text: 'Цена'
}
]

const NoDataIndication = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}


const Account = () => {
    const [page, setPage] = useState(1)
    const [user, setUser] = useState({})
    const [sizePerPage, setSizePerPage] = useState(10)
    const [orders, setOrders] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [error, setError] = useState(null)

    async function handleTableChange(type, {page, sizePerPage, cellEdit}) {
        if (cellEdit) {
            axios.put(`http://localhost:3000/api/orders/user/${cellEdit.rowId}`, {
                    [cellEdit.dataField]: cellEdit.newValue
                },
                {withCredentials: true},
            )
                .then(res => {
                    setError(null)
                    setOrders(orders => orders.map(order => order._id === res.data._id ? res.data : order))
                })
                .catch(function (error) {
                    if (error.response) {
                        setError(error.response.data.error)
                        setTimeout(() => setError(null), 2500)
                    }
                })
        }

        setPage(parseInt(page))
        setSizePerPage(parseInt(sizePerPage))
    }

    async function fetchData() {
        axios.get("http://localhost:3000/api/user/orders", {
            params: {
                pageNumber: page,
                pagination: sizePerPage,
            },
            withCredentials: true,
        })
            .then(res => {
                setOrders(res.data.orders)
                setTotalSize(res.data.totalSize)
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.error)
                }
            })
    }

    async function fetchUser() {
        axios.get("http://localhost:3000/api/user/account", {withCredentials: true}).then(res => {
            setUser(res.data)

        })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.error)
                }
            })
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
                    <Col md={4}>
                        <Container fluid>
                            <Card>
                                <Card.Header as={"h1"}>{user.fullName}</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>E-mail: {user.email}</ListGroup.Item>
                                    <ListGroup.Item>Телефон: {user.phoneNumber}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Container>
                    </Col>
                    <Col md={8}>
                        <Container fluid>
                            <Card>
                                <Card.Header as={"h3"}>Ваши заказы</Card.Header>
                                <div className="pb-3 pl-3 pr-3">
                                    <BootstrapTable
                                        remote
                                        keyField='_id'
                                        bodyClasses={'defis'}
                                        data={orders}
                                        columns={columns}
                                        cellEdit={cellEditFactory({
                                            mode: 'click',
                                            autoSelectText: true,
                                            blurToSave: true,
                                            errorMessage: error
                                        })}
                                        filter={filterFactory()}
                                        pagination={paginationFactory({page, sizePerPage, totalSize})}
                                        onTableChange={handleTableChange}
                                        noDataIndication={() => <NoDataIndication/>}
                                    />
                                </div>
                            </Card>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </MainWrapper>
    )
}


export default withPrivatePage(Account)