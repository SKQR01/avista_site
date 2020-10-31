import verify from "jsonwebtoken/verify"
<<<<<<< HEAD
import {secret} from "./secret"
import User from "@models/User"


export async function checkAuthentication(req) {
    return await verify(req.cookies.authToken, secret, async (err, decoded) => {
        const user = await User.findById(decoded._id)
        const isRequestTokenInUsersTokens = user.tokens.includes(req.cookies.authToken)
        return !!(!err && decoded && isRequestTokenInUsersTokens)
    })
}

export async function checkAdminPermission(req) {
    return await verify(req.cookies.authToken, secret, async (err, decoded) => {
        const user = await User.findById(decoded._id).populate('permissions')
        return !!user.permissions.find(permission => permission.title === "Администратор")
    })
=======

import User from "@models/User"
import withSession from "@utils/withSession"


// async function clearExpiresCookies(user) {
//     if (user.tokens.length !== 0) {
//         user.tokens = user.tokens.filter(token => {
//             const decodedToken = verify(token, secret)
//             if (decodedToken) {
//                 const expiresDate = new Date(decodedToken.exp)
//                 const today = new Date()
//                 if (expiresDate > today) {
//                     return token
//                 }
//             }
//         })
//     }
//
//     return await user.save()
// }

export async function checkAuthentication(req, session) {
    if(session){
        const user = await User.findById(session?.userId)
        const isRequestTokenInUsersTokens = user.tokens.includes(session?.sessionId)
        return !(!!user && isRequestTokenInUsersTokens)
    }
    console.log("Посылаем нафиг в checkAuthentication.")
    return "Вы, не авторизованы. Авторизуйтесь, а после этого попробуйте ещё раз."
}

export async function checkAdminPermission(req, session) {
    if(session){
        const user = await User.findById(session.userId).populate('permissions')
        return !!user.permissions.find(permission => permission.title === "Администратор")
    }
    console.log("Посылаем нафиг в checkAdminPermission.")
    return "Вы не имеете прав на это действие."
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
}



<<<<<<< HEAD
=======


>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
