import apiRoutesHandler from "@utils/apiRoutesHandler"
import callbackHandlerApi from "@utils/callbackHandlerApi"
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions"

import User from "@models/User"
import UserBusinessStatus from "@models/UserBusinessStatus"

import dbErrorCompile from "@utils/dbErrorCompile";
import validateData from "@validation/validator";


import {userSchemaValidation} from "@validation/schemes"


export default apiRoutesHandler({
    GET: callbackHandlerApi([checkAuthentication], async (req, res, session) => {
            try {
                if (!session) {
                    return res.status(401).json({errors: {name: "common", message: "Вы не авторизованы.",}})
                }

                const user = await User.findById(session.userId).select("-permissions -password -__v").populate({
                    path: "businessStatus",
                    model: UserBusinessStatus
                }).lean()
                return res.json({success: {message: "Вы авторизованы.", payload: {user: {...user}}}})
            } catch (e) {
                return res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        }
    ),
    POST:
        callbackHandlerApi([checkAuthentication], async (req, res, session) => {
            try {
                const data = req.body

                const potentialErrors = validateData(data, userSchemaValidation.accountPost)
                if (potentialErrors.length !== 0) return res.status(422).json({errors: potentialErrors})

                const user = await User.findById(session.userId)
                user.set(Object.assign(user, data))
                user.save(err => {
                    if (err) {
                        return dbErrorCompile(err, res)
                    } else {
                        return res.json({success: {name: "common", message: "Данные успешно изменены."}})
                    }
                })


                // await User.findByIdAndUpdate(session.userId, data, {
                //     runValidators: true,
                // }, (err, doc) => {
                //     if (err) {
                //         return dbErrorCompile(err, res)
                //     } else {
                //         return res.json({success: {name: "common", message: "Данные успешно изменены."}})
                //     }
                // })
            } catch (e) {
                res.status(500).json({errors: [{name: 'common', message: e.message}]})
            }
        })
})


