import verify from "jsonwebtoken/verify"
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
}



