import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import User from "@models/User"
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication, checkAdminPermission} from "@utils/callbackHandlerApiFunctions"
import validateData, {isNubmer, isPresentInObject} from "@validation/validator";


export default apiRoutesHandler(
    withDb({
            GET: callbackHandlerApi([checkAuthentication, checkAdminPermission], async (req, res, session) => {
                try {

                    const validationSchema = {
                        pageNumber: {
                            callback: [isPresentInObject, isNubmer],
                            errorMessage: ["Укажите номер страницы в параметрах запроса.", "Номер страницы должен быть целочисленным значением."]
                        },
                        pagination: {
                            callback: [isPresentInObject, isNubmer],
                            errorMessage: ["Укажите кол-во записей на одну страницу в параметрах запроса.", "Кол-во записей на одну страницу должно быть быть целочисленным значением."]
                        }
                    }

                    const potentialErrors = validateData(req.query, validationSchema)
                    if (potentialErrors.length !== 0) return res.status(422).json({errors: potentialErrors})


                    const pageNumber = parseInt(req.query.pageNumber)
                    const pagination = parseInt(req.query.pagination)

                    //Не знаю почему, но без JSON.parse не хочет работать (видимо нужен конкретно JS объект)
                    const sortParameter = req.query.sortParam ? JSON.parse(req.query.sortParam) : {createdAt: 'desc'}


                    if (!req.query.search) {
                        const users = await User.find({_id:{$ne:session.userId}}).skip((pageNumber - 1) * pagination).limit(pagination).sort(sortParameter).lean()
                        const totalSize = await User.countDocuments()

                        return res.json({success: {name: "common", payload: {users: users, totalSize: totalSize}}})
                    }

                    const users = await User.find({$text: {$search: req.query.search}, _id:{$ne:session.userId}}).skip((pageNumber - 1) * pagination).limit(pagination).sort(sortParameter).lean()
                    const totalSize = users.length


                    res.json({success: {name: "common", payload: {users: users, totalSize: totalSize}}})
                } catch (e) {
                    res.status(500).json({errors: [{name: 'common', message: e.message}]})
                }
            })
        }
    )
)

