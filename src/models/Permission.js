import mongoose from 'mongoose'
const { Schema } = mongoose

const PermissionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Пожалуйста напишите название роли."],
        maxlength: [70, "Сформулируйте название роли короче."]
    },
})



const Permission = mongoose.models.Permission || mongoose.model('Permission', PermissionSchema, "Permission")
export default Permission


