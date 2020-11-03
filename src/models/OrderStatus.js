const mongoose = require('mongoose');

const OrderStatusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Пожалуйста дайте название новому статусу."],
        maxlength: [70, "Сформулируйте статус заказа короче."]
    },
})


const OrderStatus = mongoose.models.OrderStatus || mongoose.model('OrderStatus', OrderStatusSchema, "OrderStatus")
module.exports=OrderStatus

