import jwt from "jsonwebtoken"
import {secret} from "@utils/secret"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import withDb from "@utils/dbConnect"
import User from "@models/User"

import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"

export default apiRoutesHandler(
    withDb({
        GET: callbackHandlerApi([checkAuthentication], async (req, res, session) => {
            try {
                if (!session) return res.status(403).json({
                    user:{
                        isAdmin:false,
                        errors: [{
                            name: 'common',
                            message: "Пользователь не найден."
                        }]
                    }
                })

                const user = await User.findById(session.userId).populate("permissions")
                if (!user) return res.status(404).json({errors: {name: "common", message: "Пользователь не найден."}})
                const userHavePermissions = user.permissions.find(permission => {
                    console.log("Permission", permission.title, permission.title === "Администратор")
                    return permission.title === "Администратор"
                })

                res.json({user:{isAdmin: !!userHavePermissions}})
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        })
    })
)

