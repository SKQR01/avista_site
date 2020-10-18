import mongoose from "mongoose"


const connection = {
    isConnected: 0
}

export async function dbConnect() {
    if (connection.isConnected) {
        return
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    connection.isConnected = db.connections[0].readyState
}

export function withDb(handler) {
    dbConnect()
    return handler
}

export default withDb