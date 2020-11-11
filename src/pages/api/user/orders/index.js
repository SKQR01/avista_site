import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"

import User from "@models/User"
import Order from "@models/Order"
import OrderStatus from "@models/OrderStatus"

import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"


import validateData, {isNubmer, isPresentInObject} from "@validation/validator";


export default apiRoutesHandler(
    withDb({
            GET: callbackHandlerApi([checkAuthentication], async (req, res, session) => {
                try {
                    const validationSchema = {
                        pageNumber: {
                            callback: [isPresentInObject, isNubmer],
                            errorMessage: ["Укажите номер страницы в параметрах запроса.", "Номер страницы должен быть целочисленным значением."]
                        },
                        pagination: {
                            callback: [isPresentInObject, isNubmer],
                            errorMessage: ["Укажите кол-во записей на одну страницу в параметрах запроса.", "Кол-во записей на одну страницу должно быть быть целочисленным значением."]
                        }
                    }

                    const potentialErrors = validateData(req.query, validationSchema)
                    if (potentialErrors.length !== 0) return res.status(422).json({errors: potentialErrors})


                    if (!session) return res.status(403).json({
                        errors: [{
                            name: 'common',
                            message: "Пользователя не найдено."
                        }]
                    })

                    const pageNumber = parseInt(req.query.pageNumber)
                    const pagination = parseInt(req.query.pagination)


                    const toSkip = (pageNumber - 1) * pagination

                    const usersOrders = await User.findById(session.userId).select("orders").lean()
                    const totalSize = usersOrders.orders.length
                    console.log(totalSize)

                    const user = await User.findById(session.userId).populate({
                        path: "orders",
                        select: '_id title createdAt status price',
                        model:Order,
                        options: {
                            sort: {createdAt: -1},
                            skip: toSkip,
                            limit:pagination
                        },
                        populate: {
                            path: "status",
                            model:OrderStatus
                        }
                    })


                    res.json({success: {payload: {orders:user.orders, totalSize:totalSize}}})
                } catch (e) {
                    res.status(500).json({errors: [{name: 'common', message: e.message}]})
                }
            })
        }
    )
)

