import mongoose, {Schema} from "mongoose"
import validator from "validator"

const AccessHashSchema = new Schema({
        hash: {
            type: String,
            required: [true, "Необходим хеш."],
            index: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "У хеша должен быть id пользователя."],
        },
    },
    {
        timestamps: true
    })

const AccessHash = mongoose.models.AccessHash || mongoose.model('AccessHash', AccessHashSchema, "AccessHash")

module.exports = AccessHash

