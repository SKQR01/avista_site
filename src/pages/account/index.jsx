import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"

import axios from "axios"

import BootstrapTable from 'react-bootstrap-table-next'



import MainWrapper from "@components/MainWrapper"
import {useCallback, useEffect, useState} from "react"

import filterFactory from "react-bootstrap-table2-filter"
import paginationFactory from "react-bootstrap-table2-paginator"
import overlayFactory from 'react-bootstrap-table2-overlay'

import tableDateFormatter from "@utils/tableDateFormatter"
import {useRouter} from "next/router"
import nextCookie from "next-cookies";
import {redirectIfNotAuth} from "@utils/authRedirecter"
import useUser from "@utils/useUser"
import useSWR from "swr"
import fetcher, {ordersFetcher} from "@utils/fetchJson";
import useAdmin from "@utils/useAdmin";

const columns = [{
    dataField: 'title',
    text: 'Тема',
}, {
    dataField: 'createdAt',
    text: 'Дата заказа',
    formatter: tableDateFormatter
}, {
    dataField: 'status.title',
    text: 'Статус'
}, {
    dataField: 'price',
    text: 'Цена'
}
]

const NoDataIndication = () => {
    return (
        <p>Вы пока что не сделали ни одного заказа.</p>
        // <Spinner animation="border" role="status">
        //     <span className="sr-only">Loading...</span>
        // </Spinner>
    )
}


const Account = () => {
    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [orders, setOrders] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [error, setError] = useState(null)
    const router = useRouter()

    const [node, setNode] = useState()

    async function handleTableChange(type, {page, sizePerPage}) {
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
                setOrders(res.data.success.payload.orders)
                setTotalSize(res.data.success.payload.totalSize)
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response.data)
                }
            })
    }

    const removeHandler = () => {
        const removeConfirm = confirm("Вы уверены, что хотите отказаться от указанных заказов?")

        if (removeConfirm && node.selectionContext.selected) {
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
        fetchData()
    }, [page, sizePerPage])

    const { user } = useUser({ redirectTo: '/signin' })

    if (!user || user.isLoggedIn === false) {
        return <MainWrapper>loading...</MainWrapper>
    }



    return (
        <MainWrapper>
            <Container className={"p-4"} fluid>
                <Row>
                    <Col md={4}>
                        <Container fluid>
                            <Card>
                                <Card.Header
                                    as={"h1"}>{user.secondName} {user.firstName} {user.patronymicName}</Card.Header>
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
                                <Button onClick={removeHandler}>Отказаться от выделенных заказов</Button>
                                <div className="pb-3 pl-3 pr-3">
                                    <BootstrapTable
                                        remote
                                        keyField='_id'
                                        bodyClasses={'defis'}
                                        data={orders}
                                        columns={columns}
                                        ref={n => setNode(n)}
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
                                        pagination={paginationFactory({page, sizePerPage, ...orders})}
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

// export async function getServerSideProps(ctx) {
//     redirectIfNotAuth(ctx)
//     return {props:{}}
//
// }

export default Account