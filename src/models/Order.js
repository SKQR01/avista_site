import mongoose, {Schema} from "mongoose"
import OrderStatus from "@models/OrderStatus"

<<<<<<< HEAD
=======

>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
const OrderSchema = new Schema({
        title: {
            type: String,
            required: [true, "Пожалуйста сформулируйте тему заказа."],
<<<<<<< HEAD
=======
            index: true,
            max: [100, "Пожалуйста, сформулируйте тему заказа короче."]
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
        },
        description: {
            type: String,
            required: [true, "Пожалуйста, сформулируйте описание вашего заказа."],
<<<<<<< HEAD
            maxlength: [400, "Сформулируйте описание короче."]
        },
        resolutionAdaptivity: {
            type: Array,
            required: true
=======
            index: true
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
<<<<<<< HEAD
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
=======
            required: [true, "У заказа должен быть заказчик."],
        },
        status: {
            type: Schema.Types.ObjectId,
            ref: "OrderStatus",
        },
        price: {
            type: Number,
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
        }
    },
    {
        timestamps: true
    })

<<<<<<< HEAD
OrderSchema.pre("save", () => {
    const order = this
    const status = OrderStatus.findOne({title: "Не утверждён"}).lean()
    //@ts-ignore
    order.status = status.id
})
=======
OrderSchema.index({title: 'text', description: 'text'})
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema, "Order")

module.exports = Order

