import Button from "react-bootstrap/Button"

import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import filterFactory, {textFilter, Comparator} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'

import axios from "@utils/axios"
import {useEffect, useState} from "react"

import {useRouter, withRouter} from "next/router"
import AdminPanelWrapper from "@components/admin/AdminPanelWrapper"
import {redirectIfNotAdmin} from "@utils/privateRedirects"
import Row from "react-bootstrap/Row"
import FormControl from "react-bootstrap/FormControl"
import Col from "react-bootstrap/Col"
import {tableDateFormatter} from "@utils/tableFormatter"
import {FaSortUp, FaSortDown, FaSort, FaTrashAlt, FaSyncAlt} from 'react-icons/fa'
import Nav from "react-bootstrap/Nav"
import Spinner from "react-bootstrap/Spinner";


const NoDataIndication = () => {
    return (
        <span>Заказов пока нет.</span>
    )
}


const AdminOrders = () => {

    const router = useRouter()

    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [sortField, setSortField] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState("desc")
    const [filter, setFilter] = useState({})
    const [tabOptions, setTabOptions] = useState([])


    const [orders, setOrders] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [error, setError] = useState(null)
    const [node, setNode] = useState()
    const [searchQuery, setSearchQuery] = useState()

    const [isDataFetching, setIsDataFetching] = useState(true)

    const onColumnClick = (e, column, columnIndex, row, rowIndex) => {
        router.push({pathname: `/admin/orders/${row._id}`, query: {id: row._id}})
    }

    const columns = [
        {
            dataField: '_id',
            text: 'ID заказа',
            onClick: onColumnClick,
            editable: false,
            events: {
                onClick: onColumnClick
            },
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
            editable: false,
            events: {
                onClick: onColumnClick
            },
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
            editor: {
                type: Type.SELECT,
                getOptions: (setOptions) => {
                    axios.get(`/api/admin/orders/statuses`, {withCredentials: true}).then((res) => {
                        const optionsToSet = res.data.success.payload.ordresStatuses.map(option => {
                            return {value: option._id, label: option.title}
                        })
                        setOptions(optionsToSet)
                    }).catch(err => console.log(err))

                }
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
        {
            dataField: 'user.fullName',
            text: 'Заказчик',
            editable: false,
            events: {
                onClick: onColumnClick
            },
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
    ]

    async function handleTableChange(type, {page, sizePerPage, cellEdit, sortField, sortOrder,}) {
        switch (type) {
            case "cellEdit":
                axios.put(`/api/admin/orders/${cellEdit.rowId}`, {
                        //Некоторые поля имеют иерархическое название типа: status.title это нам не подходит, поэтому мы разбиваем строку по точке,
                        // потому что нам необходима только первая часть (status)
                        [cellEdit.dataField.split(".")[0]]: cellEdit.newValue,
                    },
                )
                    .then(res => {

                        const responseOrder = res.data.success.payload.order
                        const resultOrder = {
                            ...responseOrder,
                            user: {
                                ...responseOrder,
                                fullName: `${responseOrder.user.secondName} ${responseOrder.user.firstName} ${responseOrder.user.patronymicName}`
                            }
                        }
                        setError(null)
                        setOrders(orders => orders.map(order => order._id === resultOrder._id ? resultOrder : order))
                    })
                    .catch(function (error) {
                        if (Array.isArray(error.response.data.errors[0].message)) {
                            setError(error.response.data.errors[0].message[0])
                            setTimeout(() => setError(null), 2500)
                        } else {
                            setError(error.response.data.errors[0].message)
                            setTimeout(() => setError(null), 2500)
                        }

                    })
                break
            case "sort":
                setSortField(sortField.split(".")[0])
                setSortOrder(sortOrder)
                break
            case "pagination":
                setPage(parseInt(page))
                setSizePerPage(parseInt(sizePerPage))
                break
            default:
                console.log(type)
        }



    }

    async function fetchData(value) {
        setIsDataFetching(true)
        try {
            const res = await axios.get("/api/admin/orders", {
                params: {
                    pageNumber: page,
                    pagination: sizePerPage,
                    search: value,
                    sortParam: {[sortField]: sortOrder},
                    filter: filter
                },
                withCredentials: true,
            })
            const orders = res.data.success.payload.orders.map(order => {
                return {
                    ...order,
                    user: {
                        ...order.user,
                        fullName: `${order.user?.secondName} ${order.user?.firstName} ${order.user?.patronymicName}`
                    }
                }
            })
            setOrders(orders)
            setTotalSize(res.data.success.payload.totalSize)
        } catch(error) {
                console.error(error)
            }
        setIsDataFetching(false)
    }

    async function fetchTabOptions() {
        axios.get(`/api/admin/orders/statuses`, {withCredentials: true}).then((res) => {
            const optionsToSet = res.data.success.payload.ordresStatuses.map(option => {
                return {value: option._id, label: option.title}
            })
            setTabOptions(optionsToSet)
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData()
        fetchTabOptions()
    }, [page, sizePerPage, sortField, sortOrder, filter])

    const removeHandler = () => {
        const removeConfirm = confirm("Вы уверены, что хотите отказаться от указанных заказов?")
        if (removeConfirm) {
            axios.post('/api/admin/orders/deleteOrders', {recordsToDelete: node.selectionContext.selected}, {withCredentials: true}).catch(error => {
                console.error(error.response.data)
            })
            setOrders(orders => {
                return orders.filter(order => !node.selectionContext.selected.includes(order._id))
            })
        }
    }


    const onTypingSearch = (value) => {
        setSearchQuery(query => clearTimeout(query))
        setSearchQuery(setTimeout(() => fetchData(value), 1500))
    }


    return (
        <AdminPanelWrapper>
            <Row className={"pt-5"}>
                <Col sm={12} md={8}>
                    <h2>
                        Заказы
                    </h2>
                    <FormControl placeholder={"Поиск"} onChange={e => onTypingSearch(e.target.value)}/>
                </Col>
            </Row>
            <div className={"d-flex justify-content-end py-3"}>
                <Button variant="success" onClick={()=>fetchData()} className={"mr-2"}><FaSyncAlt/></Button>
                <Button variant="danger" onClick={()=>removeHandler()}><FaTrashAlt/></Button>
            </div>

            <Nav variant="tabs" defaultActiveKey="all">
                <Nav.Item>
                    <Nav.Link eventKey={"all"} onClick={() => setFilter({})}>Все</Nav.Link>
                </Nav.Item>
                {
                    tabOptions.map(tabOption => {
                        return (
                            <Nav.Item key={tabOption.value}>
                                <Nav.Link eventKey={tabOption.value}
                                          onClick={() => setFilter({status: tabOption.value})}>{tabOption.label}</Nav.Link>
                            </Nav.Item>
                        )
                    })
                }
            </Nav>
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
                        ref={n => setNode(n)}
                        keyField='_id'
                        classes={"cell-style"}
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
                        selectRow={
                            {
                                mode: 'checkbox',
                            }
                        }
                    />
            }
        </AdminPanelWrapper>
    )
}

//Обеспечивает приватность администраторской панели
export const getServerSideProps = async (ctx) => redirectIfNotAdmin(ctx)

export default AdminOrders
