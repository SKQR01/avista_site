
const config =  require("./config");

const mongoose = require('mongoose')
const Order = require('./src/models/Order')
const OrderStatus = require('./src/models/OrderStatus')
const User = require('./src/models/User')
const Permission = require('./src/models/Permission')
const nextConfig = require('./next.config')

async function createTestUser() {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })

    const orderData1 = {
        title:"Есть над чем задуматься: чистосердечное признание облегчает душу",
        description:"Являясь всего лишь частью общей картины, сделанные на базе интернет-аналитики выводы, превозмогая сложившуюся непростую экономическую ситуацию, ограничены исключительно образом мышления. Значимость этих проблем настолько очевидна, что понимание сути ресурсосберегающих технологий играет определяющее значение для укрепления моральных ценностей. В целом, конечно, экономическая повестка сегодняшнего дня влечет за собой процесс внедрения и модернизации экспериментов, поражающих по своей масштабности и грандиозности."
    }

    const user = await User.findOne({})
    const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
    const order = await Order.create({...orderData1, user: user.id, status: defaultStatus._id})

    user.orders.addToSet(order.id)
    await user.save()


    mongoose.connection.close()
}

createTestUser()