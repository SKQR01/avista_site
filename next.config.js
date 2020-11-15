const withImages = require("next-images")
const withFonts = require('next-fonts')
require('dotenv').config()

module.exports = withImages(withFonts({
    env: {
        HOST_URL: process.env.NODE_ENV === "production" ? process.env.HOST_PRODUCTION_URL : process.env.HOST_DEV_URL,
        PORT: process.env.PORT,

        MONGODB_URI: process.env.MONGODB_URI,
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD,
        EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
        EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
        SECRET: process.env.SECRET
    },
}))