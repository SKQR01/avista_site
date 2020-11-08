import User from "./../models/User"


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
    if (session) {
        const user = await User.findById(session?.userId)
        return !(!!user)
    }
    return "Вы, не авторизованы. Авторизуйтесь, а после этого попробуйте ещё раз."
}

export async function checkAdminPermission(req, session) {
    if (session) {
        const user = await User.findById(session.userId).populate('permissions')
        return !user.permissions.find(permission => permission.title === "Администратор")
    }

    return "Вы не имеете прав на это действие."
}





