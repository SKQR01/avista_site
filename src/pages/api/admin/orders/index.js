import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication, checkAdminPermission} from "@utils/callbackHandlerApiFunctions"


export default apiRoutesHandler(
    withDb({
            GET: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res) => {
                try {
                    const pageNumber = parseInt(req.query.pageNumber)
                    const pagination = parseInt(req.query.pagination)

                    const orders = await Order.find().skip((pageNumber - 1) * pagination).limit(pagination).sort({createdAt: 'desc'}).lean()
                    const totalSize = await Order.countDocuments()
                    res.status(200).json({orders, totalSize})
                } catch (e) {
                    res.status(500).json([])
                }
            })
        }
    )
)

