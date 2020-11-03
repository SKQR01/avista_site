const mongoose = require("mongoose")

const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const OrderStatus = require("./src/models/OrderStatus")
const Permission = require("./src/models/Permission")
const config = require("./config")


const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()


const createPermissions = async (permissions) => {
    console.log("----------------Проверка наличия прав пользователей в БД.----------------")
    for (let key in permissions) {
        const foundedPermission = await Permission.findOne(permissions[key])
        console.log("Было найдено право: ", foundedPermission)
        if (!foundedPermission) {
            const createdPermission = new Permission(permissions[key])
            await createdPermission.save()
            console.log("Было создано право: ", createdPermission)
        }
    }
    console.log("----------------------------------------------------------------")
}

const createOrderStatuses = async (orderStatuses) => {
    console.log("----------------Проверка наличия статусов заказов в БД.----------------")
    for (let key in orderStatuses) {
        // console.log(`Создаём правоs: ${orderStatuses[key].title}.`)
        const foundedOrderStatus = await OrderStatus.findOne(orderStatuses[key])
        console.log("Был найден статус: ", foundedOrderStatus)
        if (!foundedOrderStatus) {
            const createdOrderStatus = new OrderStatus(orderStatuses[key])
            await createdOrderStatus.save()
            console.log("Был создан статус заказа: ", createdOrderStatus)
        }
    }
    console.log("----------------------------------------------------------------")
}


app.prepare().then(async () => {
    const dbConnection = await mongoose.connect("mongodb://localhost:27017/avista", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    await createPermissions(config.permissions)
    await createOrderStatuses(config.orderStatuses)
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        const {pathname, query} = parsedUrl


        handle(req, res, parsedUrl)

    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})