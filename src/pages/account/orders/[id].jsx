import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useRouter} from "next/router"
import axios from "axios"

const UserOrder = () => {
    const router = useRouter()
    const [order, setOrder] = useState()

    useEffect(() => {
        if(router.query.id){
            axios.get(`/api/user/orders/${router.query.id}`, {withCredentials:true}).then((res) => {
                console.log()
                setOrder(res.data.success.payload.order)
            }).catch(err => console.log(err))
        }

    }, [router])
    return(
        <pre>{order ? JSON.stringify(order, null, 4) : "Заказ не найден."}</pre>
    )
}

export default UserOrder

