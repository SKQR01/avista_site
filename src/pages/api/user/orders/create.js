import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import OrderStatus from "@models/OrderStatus"
import User from "@models/User"
import {sendNewAccountPasswordToUser} from "@utils/mailer"

import generatePassword from "password-generator"

import dbErrorCompile from "@utils/dbErrorCompile"
import validateData from "@validation/validator"
import {orderSchemaValidation} from "@validation/schemes"
import withSession from "@utils/withSession"

import config from "@root/config"


export default apiRoutesHandler(
    withDb({
        POST: withSession(async (req, res, session) => {
            try {
                // const potentialErrors = validateData(req.body, orderSchemaValidation.orderCreate)
                // if(potentialErrors.length !== 0) return res.status(422).json({errors:potentialErrors})
                const session = req.session.get("authToken")
                if (session) {
                    const user = await User.findById(session.userId)
                    if (user) {
                        const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
                        const newOrder = await Order.create({...req.body, user: user.id, status: defaultStatus._id})

                        await user.orders.addToSet(newOrder.id)
                        await user.save((err) => {
                            if (err) {
                                return dbErrorCompile(err, res)
                            }
                        })
                        res.status(200).json({success: {name: "common", message: "Заказ успешно оформлен."}})
                    } else {
                        return res.status(403).json({
                            errors: [{
                                name: 'common',
                                message: "Пользователь не найден."
                            }]
                        })
                    }
                } else {
                    const requestUserData = req.body.user
                    const newPassword = generatePassword(15, false)

                    const newUser = new User({...requestUserData, password: newPassword})

                    const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
                    const newOrder = new Order({...req.body, user: newUser._id, status: defaultStatus._id})

                    newUser.orders.addToSet(newOrder.id)

                    await newUser.save(async (err, user) => {
                        if (err) {
                            return dbErrorCompile(err, res)
                        } else {
                            try {
                                user.orders.addToSet(newOrder.id)
                                await sendNewAccountPasswordToUser(requestUserData.email, newPassword)
                                return res.json({success: {name: 'common', message: 'Ваш заказ успешно оформлен.'}})
                            } catch (e) {
                                return res.status(400).json({
                                    errors: {
                                        name: 'email',
                                        message: 'Введена некорректная почта, возможно она не существует.'
                                    }
                                })
                            }
                        }
                    })
                    await newOrder.save()
                    // if(newUser){
                    //     await sendNewAccountPasswordToUser(requestUserData.email, newPassword)
                    //     console.log("newUser.id", newUser.id)
                    //
                    //     const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
                    //     console.log("defaultStatus.id",defaultStatus.id)
                    //     const newOrder = new Order.create({...req.body, user: newUser.id, status: defaultStatus.id})
                    //
                    //     console.log("newOrder",newOrder)
                    //
                    //     newUser.orders.addToSet(newOrder.id)
                    //     return res.status(200).json({success: {name: 'common', message: 'Ваш заказ успешно оформлен.'}})
                    // }


                }
            } catch (e) {
                res.status(500).json({
                    errors: [{
                        name: 'common',
                        message: e.message
                    }]
                })
            }
        })
    })
)
