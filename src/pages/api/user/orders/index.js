import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import User from "@models/User"
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"
import verify from "jsonwebtoken/verify"
import {secret} from "@utils/secret"
<<<<<<< HEAD
=======
import validateData, {isNubmer, isPresentInObject} from "@validation/validator";
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation


export default apiRoutesHandler(
    withDb({
            GET: callbackHandlerApi([checkAuthentication], async (req, res) => {
                try {
<<<<<<< HEAD
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
=======
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

                    const userSession = req.session.get("authToken")
                    if (!userSession) return res.status(403).json({
                        errors: [{
                            name: 'common',
                            message: "Пользователя не найдено."
                        }]
                    })

                    const pageNumber = parseInt(req.query.pageNumber)
                    const pagination = parseInt(req.query.pagination)


                    const toSkip = (pageNumber - 1) * pagination

                    const user = await User.findById(userSession.userId).populate({
                        path: "orders",
                        select: '_id title createdAt status price',
                        options: {
                            sort: {createdAt: -1},
                            skip: toSkip,
                        },
                        populate: {
                            path: "status",
                        }
                    })

                    const orders = user.orders
                    const totalSize = user.orders.length

                    res.json({success: {payload: {orders:orders, totalSize:totalSize}}})
                } catch (e) {
                    res.status(500).json({errors: [{name: 'common', message: e.message}]})
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
                }
            })
        }
    )
)

