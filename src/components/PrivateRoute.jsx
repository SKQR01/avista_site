import { createContext, useState } from 'react'
import { useRouter } from 'next/router'

import {useRouter} from 'next/router'
import {useEffect} from "react"
import cookie from "cookie"


const PrivateRoute = ({children, currentCookie}) => {

    const router = useRouter()
    if (!cookie.parse(currentCookie).authToken) {
        router.push('/signin')
    }

    return (
        <div>
            {
                children
            }
        </div>
    )
}



export default PrivateRoute