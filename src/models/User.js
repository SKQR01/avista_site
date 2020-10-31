import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
<<<<<<< HEAD

=======
import uniqueValidator from "mongoose-unique-validator"
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation

import Permission from "@models/Permission"


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
<<<<<<< HEAD
        required: [true, "Пожалуйста, сформулируйте описание вашего заказа."],
        maxlength: [50, "Сформулируйте описание короче."],
        unique: [true, "Введённая почта не уникальна."],
=======
        required: [true, "Пожалуйста, укажите вашу почту (это необходимо, чтобы связаться с вами)."],
        maxlength: [50, "Email должен быть короче."],
        unique: true,
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, введите пароль."],
    },
<<<<<<< HEAD
    fullName: {
        type: String,
        required: [true, "Пожалуйста, введите ваше ФИО."],
    },
    phoneNumber: {
        type: String,
        required: [true, "Пожалуйста, ваш телефонный номер."],
=======
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
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
<<<<<<< HEAD
            ref: "Order"
=======
            ref: "Order",
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
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
<<<<<<< HEAD
        if (!user.isModified('password')) return next()
=======
        if (!user.isModified('password')) {
            return next()
        }
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
<<<<<<< HEAD
                user.permissions = user.permissions.concat([permission.id])
=======
                user.permissions.addToSet(permission.id)
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
                user.password = hash
                next()
            })
        })
    })
})


<<<<<<< HEAD
=======
UserSchema.plugin(uniqueValidator)

>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
const User = mongoose.models.User || mongoose.model('User', UserSchema, "User")

export default User





