const withImages = require("next-images")
const withFonts = require('next-fonts')

module.exports = withImages(withFonts({
    env: {
        // API_URL: process.env.API_URL,
        HOST_URL: "http://localhost",
        HOST_PORT: "3000",
        MONGO_URI: "mongodb://localhost:27017/avista",
        EMAIL: "mytestskqr@gmail.com",
        PASSWORD: "Skor2001",
        EMAIL_SERVER_USER: "mytestskqr@gmail.com",
        EMAIL_SERVER_PASSWORD: "Skor2001",
        EMAIL_SERVER_HOST: "smtp.gmail.com",
        EMAIL_SERVER_PORT: 465,
        EMAIL_FROM: "mytestskqr@gmail.com",
        SECRET: '3778214125442A472D4B614E645267556B58703273357638792F423F4528482B'
    },
}))