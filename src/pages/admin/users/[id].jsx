import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router"

import axios from "@utils/axios"


import {useForm} from "react-hook-form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {ErrorMessage} from "@hookform/error-message"

import {redirectIfNotAdmin} from "@utils/privateRedirects";
import BootstrapTable from "react-bootstrap-table-next";

import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator"

import AdminPanelWrapper from "@components/admin/AdminPanelWrapper";
import {FaSort, FaSortDown, FaSortUp, FaSyncAlt, FaTrashAlt} from "react-icons/fa";
import {tableDateFormatter} from "@utils/tableFormatter";
import Alert from "react-bootstrap/Alert";




const NoDataIndication = () => {
    return (
        <span>Заказов пока нет.</span>
    )
}

const AdminOrders = () => {
    const router = useRouter()

    const [user, setUser] = useState()
    const [commonSuccessMessage, setCommonSuccessMessage] = useState()
    const [commonErrorMessage, setCommonErrorMessage] = useState()
    const {register, handleSubmit, errors, reset} = useForm()
    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [node, setNode] = useState()

    const [sortField, setSortField] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState("desc")
    const [totalSize, setTotalSize] = useState(0)

    useEffect(() => {
        if (router.query.id) {
            axios.get(`/api/admin/users/${router.query.id}`, {
                params:{
                    pageNumber: page,
                    pagination: sizePerPage,
                    sortParam: {[sortField]: sortOrder},
                }
            }).then((res) => {

                reset(res.data.success.payload.user)
                setTotalSize(res.data.success.payload.totalSize)
                setUser(res.data.success.payload.user)
                set
            }).catch(err => console.log(err))
        }
        console.log(page)
    }, [router, page, sizePerPage])


    const onSubmit = (data, e) => {
        axios.put(`/api/admin/users/${user._id}`, {...data})
            .then((res) => setCommonSuccessMessage(res.data.success.message))
            .catch(err => {
                const error = err.response.data.errors[0].message
                setCommonErrorMessage(error)
            })
    }

    const removeHandler = () => {
        const removeConfirm = confirm("Вы уверены, что хотите отказаться от указанных заказов?")

        if (removeConfirm) {
            axios.post('/api/admin/orders/deleteOrders', {recordsToDelete: node.selectionContext.selected, userId: user._id}).then(() => {
                setUser(user => {
                    return {
                        ...user,
                        orders: user.orders.filter(order => !node.selectionContext.selected.includes(order._id))
                    }
                })
            }).catch(() => {
                setCommonErrorMessage("Что-то пошло не так.")
            })

        }
    }

    const handleTableChange = (type, {page, sizePerPage, sortField, sortOrder,}) => {
        switch (type) {
            case "sort":
                setSortField(sortField.split(".")[0])
                setSortOrder(sortOrder)
                break
            case "pagination":
                setSizePerPage(sizePerPage)
                setPage(page)
                break
            default:
                console.log(type)
        }

    }

    const columns = [
        {
            dataField: '_id',
            text: 'ID заказа',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
        {
            dataField: 'title',
            text: 'Тема заказа',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
        {
            dataField: 'status.title',
            text: 'Статус',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            },
        },
        {
            dataField: 'price',
            text: 'Оплата',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
        {
            dataField: 'createdAt',
            text: 'Дата заказа',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            },
            formatter: tableDateFormatter
        },
    ]
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            router.push({pathname: `/admin/orders/${row._id}`, query: {id: row._id}})
        },
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container fluid className={"pb-4"}>
                    <Container fluid className={"pb-4"}>
                        {commonSuccessMessage &&
                        <Alert variant={"success"}>
                            {commonSuccessMessage}
                        </Alert>
                        }


                        {commonErrorMessage &&
                        <Alert variant={"danger"}>
                            {commonErrorMessage}
                        </Alert>
                        }
                        <h2 className={"pb-3"}>О пользователе</h2>
                        <h3 className={"pb-3"}>ID:{user?._id}</h3>
                        <h3 className={"pt-2"}>ФИО</h3>
                        <Row>
                            <Col sm={4}>
                                <ErrorMessage errors={errors} name={"secondName"}/>
                                <FormControl as="input" aria-label="Фамилия"
                                             name={"secondName"}
                                             placeholder={"Фамилия"}
                                             ref={register}
                                />
                            </Col>
                            <Col sm={4}>
                                <ErrorMessage errors={errors} name={"firstName"}/>
                                <FormControl as="input" aria-label="Имя"
                                             name={"firstName"}
                                             placeholder={"Имя"}
                                             ref={register}
                                />
                            </Col>
                            <Col sm={4}>
                                <ErrorMessage errors={errors} name={"patronymicName"}/>
                                <FormControl as="input" aria-label="Отчество"
                                             name={"patronymicName"}
                                             placeholder={"Отчество"}
                                             ref={register}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <h4>Номер телефона</h4>
                                <ErrorMessage errors={errors} name={"phoneNumber"}/>
                                <FormControl as="input" aria-label="Номер телефона"
                                             name={"phoneNumber"}
                                             placeholder={"Номер телефона"}
                                             ref={register}
                                />
                            </Col>
                            <Col sm={4}>
                                <h4>Email</h4>
                                <ErrorMessage errors={errors} name={"email"}/>
                                <FormControl as="input" aria-label="Email"
                                             name={"email"}
                                             placeholder={"Email"}
                                             ref={register}
                                />
                            </Col>
                        </Row>

                        <Row className={"justify-content-end"}>
                            <Col xs={12} md={5} lg={4} style={{textAlign:"end"}}>

                                <Button onClick={router.back}>Назад</Button>
                                <Button className={"ml-sm-3"}  type={"submit"}>Изменить данные</Button>
                            </Col>
                        </Row>
                    </Container>
                    <div className={"d-flex justify-content-end"}>
                        <Button variant="danger" onClick={()=>removeHandler()}><FaTrashAlt/></Button>
                    </div>
                    <BootstrapTable
                        remote
                        ref={n => setNode(n)}
                        keyField='_id'
                        classes={"cell-style"}
                        data={user?.orders || []}
                        columns={columns}
                        onTableChange={handleTableChange}
                        filter={filterFactory()}
                        pagination={paginationFactory({page, sizePerPage, totalSize:totalSize})}
                        noDataIndication={() => <NoDataIndication/>}
                        selectRow={
                            {
                                mode: 'checkbox',
                            }
                        }
                        rowEvents={rowEvents}
                    />


                </Container>

            </form>
        </>
    )
}

//Обеспечивает приватность администраторской панели
export const getServerSideProps = async (ctx) => redirectIfNotAdmin(ctx)

export default AdminOrders

