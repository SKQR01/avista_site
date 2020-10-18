import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import User from "@models/User"
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"
import verify from "jsonwebtoken/verify"
import {secret} from "@utils/secret"


export default apiRoutesHandler(
    withDb({
            GET: callbackHandlerApi([checkAuthentication], async (req, res) => {
                try {
                    // console.log('some cookies', req)
                    if (req.query.pageNumber && req.query.pagination) {
                        const userData = await verify(req.cookies.authToken, secret)
                        const pageNumber = parseInt(req.query.pageNumber)
                        const pagination = parseInt(req.query.pagination)


                        const toSkip = (pageNumber - 1) * pagination

                        const user = await User.findById(userData._id).populate({
                            path: "orders",
                            select: '_id title createdAt',
                            options: {
                                sort: {createdAt: -1},
                                skip: toSkip,
                                perDocumentLimit: pagination
                            }
                        })

                        const orders = user.orders
                        const totalSize = user.orders.length

                        res.json({orders, totalSize})
                    } else {
                        res.json({error: "Please, specify the pageNumber and pagination parameters."})
                    }
                } catch (e) {
                    console.log(e)
                    res.status(500).json([])
                }
            })
        }
    )
)

