const mongoose = require('mongoose');



const OrderSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Пожалуйста сформулируйте тему заказа."],
            index: true,
            max: [100, "Пожалуйста, сформулируйте тему заказа короче."]
        },
        description: {
            type: String,
            required: [true, "Пожалуйста, сформулируйте описание вашего заказа."],
            index: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "У заказа должен быть заказчик."],
        },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderStatus",
            required: [true, "Заказ должен иметь статус."],
        },
        price: {
            type: Number,
        }
    },
    {
        timestamps: true
    })

OrderSchema.index({title: 'text', description: 'text'})


module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)

