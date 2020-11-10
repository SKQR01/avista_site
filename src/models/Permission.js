const mongoose = require('mongoose')


const PermissionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Пожалуйста напишите название роли."],
        maxlength: [70, "Сформулируйте название роли короче."]
    },
})



module.exports=mongoose.models.Permission || mongoose.model('Permission', PermissionSchema)


