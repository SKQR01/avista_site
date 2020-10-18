require('dotenv').config()
const path = require('path')

module.exports = {
    env: {
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
}