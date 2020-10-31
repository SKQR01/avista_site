import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import uniqueValidator from "mongoose-unique-validator"

import Permission from "@models/Permission"


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Пожалуйста, укажите вашу почту (это необходимо, чтобы связаться с вами)."],
        maxlength: [50, "Email должен быть короче."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, введите пароль."],
    },
    firstName: {
        type: String,
        required: [true, "Пожалуйста, введите ваше имя."],
    },
    secondName: {
        type: String,
        required: [true, "Пожалуйста, введите вашу фамилию."],

    },
    patronymicName: {
        type: String,
        required: [true, "Пожалуйста, введите ваше отчество."],

    },
    phoneNumber: {
        type: String,
        required: [true, "Пожалуйста, укажите ваш телефонный номер."],
        unique: true,
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
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
        if (!user.isModified('password')) {
            return next()
        }
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.permissions.addToSet(permission.id)
                user.password = hash
                next()
            })
        })
    })
})


UserSchema.plugin(uniqueValidator)

const User = mongoose.models.User || mongoose.model('User', UserSchema, "User")

export default User





