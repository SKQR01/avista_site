
const config =  require("./config");

const mongoose = require('mongoose')
const Order = require('./src/models/Order')
const OrderStatus = require('./src/models/OrderStatus')
const User = require('./src/models/User')
const Permission = require('./src/models/Permission')
const nextConfig = require('./next.config')

async function createTestUser() {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    const requestUserData1 = {
        email: "skoreevevgeny@yandex.ru",
        password: "Skor2001",
        firstName: "Блаблаб",
        secondName: "Блаблабов",
        patronymicName: "Блаблабович",
        phoneNumber: "+79826624495",
    }
    const orderData1 = {
        title:"Есть над чем задуматься: чистосердечное признание облегчает душу",
        description:"Являясь всего лишь частью общей картины, сделанные на базе интернет-аналитики выводы, превозмогая сложившуюся непростую экономическую ситуацию, ограничены исключительно образом мышления. Значимость этих проблем настолько очевидна, что понимание сути ресурсосберегающих технологий играет определяющее значение для укрепления моральных ценностей. В целом, конечно, экономическая повестка сегодняшнего дня влечет за собой процесс внедрения и модернизации экспериментов, поражающих по своей масштабности и грандиозности."
    }

    const newUser1 = await User.create({...requestUserData1})
    const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
    const newOrder1 = await Order.create({...orderData1, user: newUser1.id, status: defaultStatus._id})
    await newOrder1.save()

    newUser1.orders.addToSet(newOrder1.id)
    await newUser1.save()

    // const requestUserData2 = {
    //     email: "skoreev.zhenya@mail.ru",
    //     password: "Skor2001",
    //     firstName: "Евгений",
    //     secondName: "Скореев",
    //     patronymicName: "Павлович",
    //     phoneNumber: "+79826624491",
    // }
    //
    // const permission = await Permission.findOne(config.permissions.admin)
    // const newUser2 = await User.create({...requestUserData2})
    // newUser2.permissions.addToSet(permission.id)
    // await newUser2.save()

    mongoose.connection.close()
}

createTestUser()