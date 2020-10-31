import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import Order from '@models/Order'
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication, checkAdminPermission} from "@utils/callbackHandlerApiFunctions"
<<<<<<< HEAD
=======
import User from "@models/User";
import verify from "jsonwebtoken/verify";
import {secret} from "@utils/secret";
import validateData, {isPresentInObject} from "@validation/validator";
import mongoose from "mongoose";
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation


export default apiRoutesHandler(
    withDb({
<<<<<<< HEAD
            POST: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res) => {
                try {
                    if (req.body.recordsToDelete) {
                        await Order.deleteMany({_id: {$in: req.body.recordsToDelete}})
                        res.status(200).json([])
                    } else {
                        res.json({error: "Please, specify array of _id."})
                    }
                } catch (e) {
                    res.status(500).json(e.message)
=======
            POST: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res, session) => {
                try {
                    //в отдельный файлик схему валидации не стал пихать, т.к. схемка маленькая и не стоит того её в отдельный файл выносить
                    const validationSchema = {
                        recordsToDelete: {
                            callback: [isPresentInObject],
                            errorMessage: ["Вы должны указать массив из id записей, которые необходимо удалить."]

                        }
                    }
                    //Проверяем, есть ли ошибки. Если есть, то возвращаем их.
                    const potenitalErrors = validateData(req.body, validationSchema)
                    if (potenitalErrors.length !== 0) return res.status(422).json({errors: potenitalErrors})

                    let {recordsToDelete} = req.body

                    //Очень долго маялся, нашёл пример.
                    //https://docs.mongodb.com/manual/reference/operator/update/pull/#remove-all-items-that-equal-a-specified-value
                    await User.updateMany({orders:{$in:recordsToDelete}}, {$pull:{orders:{$in:recordsToDelete}}})

                    await Order.deleteMany({_id: {$in: req.body.recordsToDelete}})
                    res.json({success: {name: 'common', message: 'Указанные записи удалены.'}})
                } catch (e) {
                    console.log(e)
                    res.status(500).json({errors: [{name: 'common', message: e.message}]})
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
                }
            })
        }
    )
)

