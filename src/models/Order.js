import mongoose, {Schema} from "mongoose"
import OrderStatus from "@models/OrderStatus"

const OrderSchema = new Schema({
        title: {
            type: String,
            required: [true, "Пожалуйста сформулируйте тему заказа."],
        },
        description: {
            type: String,
            required: [true, "Пожалуйста, сформулируйте описание вашего заказа."],
            maxlength: [400, "Сформулируйте описание короче."]
        },
        resolutionAdaptivity: {
            type: Array,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: Schema.Types.ObjectId,
            ref: "OrderStatus"
        },
        // company: {
        //     type: String
        // },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    })

OrderSchema.pre("save", () => {
    const order = this
    const status = OrderStatus.findOne({title: "Не утверждён"}).lean()
    //@ts-ignore
    order.status = status.id
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema, "Order")

module.exports = Order

