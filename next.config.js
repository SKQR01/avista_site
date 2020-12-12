const withImages = require("next-images")
const withFonts = require('next-fonts')
require('dotenv').config()

//Узнать id чата можно тут https://api.telegram.org/bot<Токен бота>/getUpdates (без скобок)

module.exports = withImages(withFonts({
    env: {
        HOST_URL: process.env.NODE_ENV === "production" ? process.env.HOST_PRODUCTION_URL : process.env.HOST_DEV_URL,
        PORT: process.env.PORT,
        TELEGRAM_BOT_TOKEN:process.env.TELEGRAM_BOT_TOKEN,
        MONGODB_URI: process.env.MONGODB_URI,
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD,
        EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
        EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
        SECRET: process.env.SECRET
    },
}))