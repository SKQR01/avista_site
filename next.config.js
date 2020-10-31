require('dotenv').config()
const path = require('path')

module.exports = {
    env: {
<<<<<<< HEAD
        API_URL: process.env.API_URL,
        MONGO_URI: "'mongodb://localhost:27017/avista"
    },
    // webpack: (config) => {
    //     config.resolve.alias = {
    //         ...config.resolve.alias,
    //         '@': path.resolve(__dirname, 'src'),
    //         '@components': path.resolve(__dirname, 'src/components'),
    //         '@utils': path.resolve(__dirname, 'src/utils/'),
    //         '@models': path.resolve(__dirname, 'src/models/'),
    //         '@styles': path.resolve(__dirname, 'src/styles/')
    //     }
    //
    //     return config
    // },
=======
        // API_URL: process.env.API_URL,
        HOST_URL: "http://localhost:3000",
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
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
}