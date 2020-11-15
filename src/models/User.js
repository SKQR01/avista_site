const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const uniqueValidator = require("mongoose-unique-validator")

const config = require("../../config")
const Permission = require("./Permission")
const Order = require("./Order")


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
    ITN: {
        type: String,
        required: [true, "Пожалуйста, укажите ваш ИНН."],
        max:[12, "ИНН не может быть иметь больше 12 цифр."],
        unique: true,
    },
    businessStatus:  {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Пожалуйста, укажите ваш статус."],
        ref: "UserBusinessStatus",
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
        }
    ],
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    const user = this
    Permission.findOne(config.permissions.user).then(permission => {
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

UserSchema.index({email: 'text', phoneNumber: 'text', firstName: "text", secondName: "text", patronymicName: "text"})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)





