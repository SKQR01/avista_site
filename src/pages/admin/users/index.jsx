import Button from "react-bootstrap/Button"

import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter';
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
        <span>Ни одного пользователя пока что не найдено.</span>
    )
}


const AdminUsers = () => {

    const router = useRouter()

    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [sortField, setSortField] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState("desc")


    const [users, setUsers] = useState([])
    const [totalSize, setTotalSize] = useState()
    const [node, setNode] = useState()
    const [searchQuery, setSearchQuery] = useState()

    const [isDataFetching, setIsDataFetching] = useState(true)


    const onRowClick = (e, row, rowIndex) => {
        router.push({pathname: `/admin/users/${row._id}`, query: {id: row._id}})
    }

    const columns = [
        {
            dataField: '_id',
            text: 'ID пользователя',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
        {
            dataField: 'secondName',
            text: 'Фамилия',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
        {
            dataField: 'firstName',
            text: 'Имя',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            },
        },
        {
            dataField: 'patronymicName',
            text: 'Отчество',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            },
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<FaSort/>);
                else if (order === 'asc') return (<FaSortUp/>);
                else if (order === 'desc') return (<FaSortDown/>);
                return null;
            }
        },
        {
            dataField: 'phoneNumber',
            text: 'Телефон',
            sort: true,
        },
        {
            dataField: 'createdAt',
            text: 'Дата регистрации',
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

    async function handleTableChange(type, {page, sizePerPage, cellEdit, sortField, sortOrder,}) {
        switch (type) {
            case "sort":
                setSortField(sortField.split(".")[0])
                setSortOrder(sortOrder)
                break
            default:
                console.log(type)
        }


        setPage(parseInt(page))
        setSizePerPage(parseInt(sizePerPage))
    }

    async function fetchData(value) {
        setIsDataFetching(true)
        try {
            const res = await  axios.get("/api/admin/users", {
                params: {
                    pageNumber: page,
                    pagination: sizePerPage,
                    search: value,
                    sortParam: {[sortField]: sortOrder},
                },
            })
            setUsers(res.data.success.payload.users)
            setTotalSize(res.data.success.payload.totalSize)
        }catch (e) {
            console.error(e)
        }

        setIsDataFetching(false)
    }


    useEffect(() => {
        fetchData()
    }, [page, sizePerPage, sortField, sortOrder])

    const removeHandler = () => {
        // console.log(node.selectionContext.selected)
        const removeConfirm = confirm("Вы уверены, что хотите отказаться от указанных заказов?")

        if (removeConfirm) {
            axios.post('/api/admin/users/deleteUsers', {recordsToDelete: node.selectionContext.selected}).catch(error => {
                console.error(error.response.data)
            })
            setUsers(users => {
                return users.filter(user => !node.selectionContext.selected.includes(user._id))
            })
        }
    }


    const onTypingSearch = (value) => {
        setSearchQuery(query => clearTimeout(query))
        setSearchQuery(setTimeout(() => fetchData(value), 1500))
    }


    return (
        <AdminPanelWrapper>
            <Row>
                <Col sm={12} md={8} className={"pt-5"}>
                    <h2>
                        Пользователи
                    </h2>
                    <FormControl placeholder={"Поиск"} onChange={e => onTypingSearch(e.target.value)}/>
                </Col>
            </Row>
            <div className={"d-flex justify-content-end py-3"}>
                <Button variant="success" onClick={() => fetchData()} className={"mr-2"}><FaSyncAlt/></Button>
                <Button variant="danger" onClick={() => removeHandler()}><FaTrashAlt/></Button>
            </div>
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
                        data={users}
                        columns={columns}
                        filter={filterFactory()}
                        pagination={paginationFactory({page, sizePerPage, totalSize})}
                        onTableChange={handleTableChange}
                        noDataIndication={() => <NoDataIndication/>}
                        rowEvents={{
                            onClick: onRowClick
                        }}
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

export default AdminUsers
