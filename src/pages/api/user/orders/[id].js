import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"

import OrderStatus from "@models/OrderStatus"
import Order from "@models/Order"

import callbackHandlerApi from "@utils/callbackHandlerApi";
import {checkAdminPermission, checkAuthentication} from "@utils/callbackHandlerApiFunctions"
import validateData from "@validation/validator";
import {orderSchemaValidation} from "@validation/schemes";
import User from "@models/User";





export default apiRoutesHandler(
    {
        GET: callbackHandlerApi([checkAuthentication], async (req, res, session) => {
            try {
                const {query: {id}} = req
                if (!id) return res.status(403).json({
                    errors: [{
                        name: 'common',
                        message: "Пожалуйста, укажите id заказа."
                    }]
                })

                if (!session) return res.status(403).json({
                    errors: [{
                        name: 'common',
                        message: "Пользователь не найден."
                    }]
                })

                // const user = await User.findById(session.userId).lean()

                const order = await Order.findOne({_id: id, user: session.userId}).populate({path:"status", model:OrderStatus})
                res.json({success: {payload: {order:order}}})
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        }),
        PUT: callbackHandlerApi([checkAuthentication], async (req, res) => {
            try {
                const data = req.body
                const potentialValidationErrors = validateData(data, orderSchemaValidation.orderPut)
                if(potentialValidationErrors.length !== 0) return res.status(422).json({errors:potentialValidationErrors})


                const order = await Order.findByIdAndUpdate(req.query.id, data, {new:true}).populate({path:"user", model:User}).populate({path:"status", model:OrderStatus}).lean()
                res.json({success: {name: 'common', payload: {order: order}, message:"Данные успешно изменены."}})
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        }),
    }
)
