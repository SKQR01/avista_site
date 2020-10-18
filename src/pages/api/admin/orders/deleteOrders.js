import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication, checkAdminPermission} from "@utils/callbackHandlerApiFunctions"


export default apiRoutesHandler(
    withDb({
            POST: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res) => {
                try {
                    if (req.body.recordsToDelete) {
                        await Order.deleteMany({_id: {$in: req.body.recordsToDelete}})
                        res.status(200).json([])
                    } else {
                        res.json({error: "Please, specify array of _id."})
                    }
                } catch (e) {
                    res.status(500).json(e.message)
                }
            })
        }
    )
)

