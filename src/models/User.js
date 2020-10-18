import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"


import Permission from "@models/Permission"


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Пожалуйста, сформулируйте описание вашего заказа."],
        maxlength: [50, "Сформулируйте описание короче."],
        unique: [true, "Введённая почта не уникальна."],
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, введите пароль."],
    },
    fullName: {
        type: String,
        required: [true, "Пожалуйста, введите ваше ФИО."],
    },
    phoneNumber: {
        type: String,
        required: [true, "Пожалуйста, ваш телефонный номер."],
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    tokens: {
        type: [String]
    },
    permissions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Permission",
        }
    ],
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    const user = this
    Permission.findOne({title: "Пользователь"}).then(permission => {
        if (!user.isModified('password')) return next()
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.permissions = user.permissions.concat([permission.id])
                user.password = hash
                next()
            })
        })
    })
})


const User = mongoose.models.User || mongoose.model('User', UserSchema, "User")

export default User





