import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import User from '@models/User'

<<<<<<< HEAD
=======
import {sendNewAccountPasswordToUser} from "@utils/mailer"
import dbErrorCompile from "@utils/dbErrorCompile"
import {userSchemaValidation} from "@validation/schemes"
import validateData from "@validation/validator"
import withSession from "@utils/withSession";

>>>>>>> 01314a2... Private routes, SWR, remove orders, validation


export default apiRoutesHandler(
    withDb({
<<<<<<< HEAD
        GET: async (req, res) => {
            try {
                const users = await User.find().lean()
                res.status(200).json({data: users})
            } catch (e) {
                res.status(500).json({error: e.message})
            }
        },
        POST: async (req, res) => {
            try {
                const newUser = new User(req.body)
                await newUser.save()
                res.status(200).json(newUser)
            } catch (e) {
                res.status(500).json({error: e.message})
            }
        }
=======
        POST: withSession(async (req, res) => {
            try {
                if (req.session.get("authToken")) {
                    return res.status(400).send({
                        errors: [{
                            name: 'common',
                            message: "Вы авторизованы, чтобы зарегистрировать новый аккаунт, выйдите из своего текущего."
                        }]
                    })
                }
                const data = req.body

                const potentialErrors = validateData(data, userSchemaValidation.signup)
                if(potentialErrors.length !== 0) return  res.status(422).json({errors:potentialErrors})


                const newUser = new User(data)
                await newUser.save(function (err) {
                    if (err) {
                        return dbErrorCompile(err, res)
                    }
                    sendNewAccountPasswordToUser(data.email, data.password)
                    res.status(200).json({success: {name: 'common', message: "Вы успешно зарегистрированы."}})

                })
            } catch (e) {
                res.status(500).send({errors: [{name: 'common', message: e.message}]})
            }
        })
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    })
)
