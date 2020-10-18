import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import axios from "axios"
import {useEffect, useState} from "react"

import withPrivatePage from "@hocs/withPrivatePage"


const columns = [
    {
        dataField: '_id',
        text: 'ID заказа',
        editable: false
    },
    {
        dataField: 'title',
        text: 'Тема заказа',
    },
    {
        dataField: 'status',
        text: 'Статус'
    },
    {
        dataField: 'price',
        text: 'Оплата'
    },
    {
        dataField: 'user',
        text: 'Заказчик',
        editable: false
    },
]


const NoDataIndication = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}


const AdminOrders = () => {

    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [orders, setOrders] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [error, setError] = useState(null)
    const [node, setNode] = useState()

    async function handleTableChange(type, {page, sizePerPage, cellEdit}) {
        console.log(type)
        if (cellEdit) {
            axios.put(`http://localhost:3000/api/orders/admin/${cellEdit.rowId}`, {
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
        axios.get("http://localhost:3000/api/orders/admin", {
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


    useEffect(() => {
        fetchData()
    }, [page, sizePerPage])

    const removeHandler = () => {
        axios.post('/api/orders/admin/deleteOrders', {recordsToDelete: node.selectionContext.selected}, {withCredentials: true})
        setOrders(orders => {
            return orders.filter(order => !node.selectionContext.selected.includes(order._id))
        })
    }

    return (
        <>
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
            />
        </>
    )
}


export default withPrivatePage(AdminOrders)
