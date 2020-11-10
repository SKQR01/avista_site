import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication, checkAdminPermission} from "@utils/callbackHandlerApiFunctions"
import User from '@models/User'
import Order from '@models/Order'

import validateData, {isEmail, isNubmer, isPhoneNubmer} from "@validation/validator"
import {orderSchemaValidation} from "@validation/schemes";
import OrderStatus from "@models/OrderStatus";


export default apiRoutesHandler(
    withDb({
        GET: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res, session) => {
                try {
                    if (!session) {
                        return res.status(401).json({
                            errors: {
                                name: "Common",
                                message: "Вы не авторизованы.",
                                payload: {user: {isLoggedIn: false}}
                            }
                        })
                    }

                    const {query: {id}} = req
                    if (!id) return res.status(403).json({
                        errors: [{
                            name: 'common',
                            message: "Пожалуйста, укажите id пользователя."
                        }]
                    })

                    const user = await User.findById(id).select("-permissions -password -__v").populate(
                        {
                            path:"orders",
                            model:Order,
                            populate: {
                                path: "status",
                                model:OrderStatus
                            }
                        }).lean()
                    return res.json({success: {name: "common", payload: {user: user}}})
                } catch (e) {
                    res.status(500).json({errors: [{name: 'common', message: e.message}]})
                }
            }
        ),
        PUT: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res) => {
            try {
                const data = req.body
                // const potentialValidationErrors = validateData(data, orderSchemaValidation.orderPut)
                // if (potentialValidationErrors.length !== 0) return res.status(422).json({errors: potentialValidationErrors})


                const order = await User.findByIdAndUpdate(req.query.id, data, {new: true}).lean()
                res.json({success: {name: 'common', payload: {order: order}, message: "Данные успешно изменены."}})
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        }),
        DELETE: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res) => {
            try {
                const {query: {id}} = req
                const deletedUser = await User.deleteOne({_id: id})
                if (!deletedUser) {
                    res.status(400).json({errors: [{name: "common", message: "Пользователя не существует."}]})
                }
                res.json({success: {name: 'common', payload: deletedUser}})
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        }),
    })
)