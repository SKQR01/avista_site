import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import axios from "axios"
import {useEffect, useState} from "react"

import {useRouter} from "next/router"
import AdminPanelWrapper from "@components/admin/AdminPanelWrapper";

const onColumnClick = (e, column, columnIndex, row, rowIndex) => {
    console.log(e);
    console.log(column);
    console.log(columnIndex);
    console.log(row);
    console.log(rowIndex);
    alert('Click on Product ID field');
}

const columns = [
    {
        dataField: '_id',
        text: 'ID заказа',
        editable: false,
        onClick: onColumnClick
    },
    {
        dataField: 'title',
        text: 'Тема заказа',
        editable: false,
        onClick: onColumnClick
    },
    {
        dataField: 'status.title',
        text: 'Статус',
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
        }
    },
    {
        dataField: 'price',
        text: 'Оплата'
    },
    {
        dataField: 'user.fullName',
        text: 'Заказчик',
        editable: false,
        onClick: onColumnClick
    },
]


const NoDataIndication = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Загружаем...</span>
        </Spinner>
    )
}


const AdminOrders = () => {

    const router = useRouter()

    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)


    const [orders, setOrders] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [error, setError] = useState(null)
    const [node, setNode] = useState()
    const [searchQuery, setSearchQuery] = useState()

    async function handleTableChange(type, {page, sizePerPage, cellEdit}) {
        if (cellEdit) {
            axios.put(`http://localhost:3000/api/admin/orders/${cellEdit.rowId}`, {
                    //Некоторые поля имеют иерархическое название типа: status.title это нам не подходит, поэтому мы разбиваем строку по точке,
                    // потому что нам необходима только первая часть (status)
                    [cellEdit.dataField.split(".")[0]]: cellEdit.newValue,
                },
                {withCredentials: true},
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
        }

        setPage(parseInt(page))
        setSizePerPage(parseInt(sizePerPage))
    }

    async function fetchData(value) {
        axios.get("http://localhost:3000/api/admin/orders", {
            params: {
                pageNumber: page,
                pagination: sizePerPage,
                search: value
            },
            withCredentials: true,
        })
            .then(res => {
                const orders = res.data.success.payload.orders.map(order => {
                    return {
                        ...order,
                        user: {
                            ...order.user,
                            fullName: `${order.user.secondName} ${order.user.firstName} ${order.user.patronymicName}`
                        }
                    }
                })
                setOrders(orders)
                setTotalSize(res.data.success.payload.totalSize)
            })
            .catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {
        fetchData()
    }, [page, sizePerPage])

    const removeHandler = () => {
        axios.post('/api/admin/orders/deleteOrders', {recordsToDelete: node.selectionContext.selected}, {withCredentials: true}).catch(error => {
            console.log(error.response.data)
        })
        setOrders(orders => {
            return orders.filter(order => !node.selectionContext.selected.includes(order._id))
        })
    }


    const onTypingSearch = (value) => {
        setSearchQuery(query => clearTimeout(query))
        setSearchQuery(setTimeout(() => fetchData(value), 1500))
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            router.push({pathname: `/admin/orders/${row._id}`, query: {id: row._id}})
        },
    }

    return (
        <AdminPanelWrapper>
            <div>
                <input placeholder={"Поиск"} onChange={e => onTypingSearch(e.target.value)}/>
            </div>
            <Button variant="danger" onClick={removeHandler}>Danger</Button>
            <BootstrapTable
                remote
                ref={n => setNode(n)}
                keyField='_id'
                bodyClasses={'defis'}
                data={orders}
                columns={columns}
                cellEdit={cellEditFactory({mode: 'click', autoSelectText: true, blurToSave: true, errorMessage: error})}
                filter={filterFactory()}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={handleTableChange}
                noDataIndication={() => <NoDataIndication/>}
                selectRow={
                    {
                        mode: 'checkbox',
                    }
                }
                rowEvents={rowEvents}
            />
        </AdminPanelWrapper>
    )
}


export default AdminOrders
