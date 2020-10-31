import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
<<<<<<< HEAD
import Order from '@models/Order'
import next from "next"

export default apiRoutesHandler(
    withDb({
        GET: async (req, res) => {
            try {
                const {query: {id}} = req
                const order = await Order.findById(id)
                res.json({data: order})
            } catch (e) {
                res.status(500).json({error: e.message})
            }
        },
        PUT: async (req, res) => {
            try {
                const order = await Order.findByIdAndUpdate(req.query.id, req.body, {new: true, runValidators: true})
                await order.save()
                res.json(order)
            } catch (e) {
                res.status(400).json({error:e.message})
            }
        },
        DELETE: async (req, res) => {
            try {
                const {query: {id}} = req
                const deletedOrder = await Order.deleteOne({_id: id})
                if (!deletedOrder) {
                    res.status(500).json({error: "Заказ не существует"})
                }
                res.json({data: deletedOrder})
            } catch (e) {
                res.status(500).json({error: e.message})
            }
        },
=======
import User from "@models/User"
import Order from "@models/Order"

import callbackHandlerApi from "@utils/callbackHandlerApi";
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"

import {verify} from "jsonwebtoken"
import {secret} from "@utils/secret"


export default apiRoutesHandler(
    withDb({
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

                const order = await Order.findOne({_id: id, user: session.userId})
                res.json({success: {payload: {order:order}}})
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        })
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    })
)
