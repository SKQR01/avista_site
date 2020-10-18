import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
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
    })
)
