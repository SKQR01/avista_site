import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import generatePassword from "password-generator"
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"


import {verify} from "jsonwebtoken"
import {secret} from "@utils/secret"

import User from "@models/User"


export default apiRoutesHandler(
    withDb({
        POST: async (req, res) => {
            try {
                if (req.cookies.authToken) {
                    verify(req.cookies.authToken, secret, async (err, decoded) => {
                            const user = await User.findById(decoded._id)
                            if (!err && decoded && user) {
                                const newOrder = await new Order({...req.body, user: user.id})
                                await newOrder.save()

                                await user.orders.addToSet(newOrder.id)
                                await user.save()
                                res.status(200).json(newOrder)
                            } else {
                                res.status(404).json({error: "Текущего пользователя не существует"})
                            }
                        }
                    )
                } else {
                    const newPassword = generatePassword(15, false)
                    const newUser = await new User({...req.body.user, password: newPassword})
                    await newUser.save()
                    const newOrder = await new Order({...req.body, user: newUser.id})
                    await newOrder.save()
                    console.log(newPassword)
                    newUser.orders.addToSet(newOrder.id)
                    await newUser.save()
                    res.status(200).json(newOrder)
                }
            } catch (e) {
                res.status(500).json({error: e.message})
            }
        }
    })
)
