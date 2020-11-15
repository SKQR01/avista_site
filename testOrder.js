const config = require("./config");
const axios = require("axios")
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

    const users = await User.find().lean()
    const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
    for(let number in users){
        const user = await User.findById(users[number]._id)
        for(let i = 0; i<9; i++){
            console.log(`------------------------${i}-------------------------`)
            const orderTitle = await axios.get("https://fish-text.ru/get", {
                params: {
                    type: "title",
                    number: 1,
                    format: "json"
                }
            })
            const orderDescription = await axios.get("https://fish-text.ru/get", {
                params: {
                    type: "paragraph",
                    number: 2,
                    format: "json"
                }
            })
            if(orderTitle){
                console.log(orderTitle.data)
            }
            if(orderDescription){
                console.log(orderDescription.data)
            }

            if(orderTitle && orderDescription){
                console.log("Добавляем")
                const newOrder = new Order({title: orderTitle.data.text, description: orderDescription.data.text, user:user._id, status:defaultStatus._id})
                await newOrder.save()
                await user.orders.addToSet(newOrder)
                await user.save()
            }

            console.log("---------------------------------------------------")
        }
    }


    // const orderData1 = {
    //     title:"Есть над чем задуматься: чистосердечное признание облегчает душу",
    //     description:"Являясь всего лишь частью общей картины, сделанные на базе интернет-аналитики выводы, превозмогая сложившуюся непростую экономическую ситуацию, ограничены исключительно образом мышления. Значимость этих проблем настолько очевидна, что понимание сути ресурсосберегающих технологий играет определяющее значение для укрепления моральных ценностей. В целом, конечно, экономическая повестка сегодняшнего дня влечет за собой процесс внедрения и модернизации экспериментов, поражающих по своей масштабности и грандиозности."
    // }
    //
    // const user = await User.find({})
    // const defaultStatus = await OrderStatus.findOne(config.orderStatuses.notAccepted).lean()
    // const order = await Order.create({...orderData1, user: user.id, status: defaultStatus._id})
    //
    // user.orders.addToSet(order.id)
    // await user.save()


    mongoose.connection.close()
}

createTestUser()