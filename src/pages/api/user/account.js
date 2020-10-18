import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"



import {verify} from "jsonwebtoken"
import {secret} from "@utils/secret"

import User from "@models/User"



export default apiRoutesHandler(
    withDb({
        GET: callbackHandlerApi([checkAuthentication],async (req, res) => {
            try {
                const userData = verify(req.cookies.authToken, secret)
                const user = await User.findById(userData._id)
                res.json(user)
            } catch (e) {
                res.status(500).json({success: false})
            }
        }
        )
    })
)
