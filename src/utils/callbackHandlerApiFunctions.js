import User from "@models/User"


export async function checkAuthentication(req, session) {
    if (session) {
        const user = await User.findById(session.userId).lean()
        if (!user) {

            req.session.destroy()
            return "Вы, не авторизованы. Авторизуйтесь, а после этого попробуйте ещё раз."
        }
        return !(!!user)
    }

}

export async function checkAdminPermission(req, session) {
    if (session) {
        const user = await User.findById(session.userId).populate('permissions')
        return !user.permissions.find(permission => permission.title === "Администратор")
    }

    return "Вы не имеете прав на это действие."
}





