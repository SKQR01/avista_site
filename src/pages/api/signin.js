import {compare} from "bcrypt"
import jwt from "jsonwebtoken"


import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import User from '@models/User'

import {secret} from "@utils/secret"
import cookie from "cookie"
<<<<<<< HEAD

=======
import dbErrorCompile from "@utils/dbErrorCompile"
import {v4 as uuidv4} from "uuid"
import withSession from "@utils/withSession"
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation


export default apiRoutesHandler(
    withDb({
<<<<<<< HEAD
        POST: async (req, res) => {
            try {

                const user = await User.findOne({$or:[{username:req.body.values.mailOrUsername}, {email:req.body.values.mailOrUsername}]})
                if(user) {
                    await compare(req.body.values.password, user.password, async function (err, result) {
                        if (!err && result && !req.headers.cookie) {
                            const claims = {_id: user._id}
                            const jwtTock = jwt.sign(claims, secret, {expiresIn: "365 days"})
                            user.tokens = user.tokens.concat([jwtTock])

                            await user.save()

                            res.setHeader("Set-Cookie", cookie.serialize("authToken", jwtTock, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: true,
                                maxAge: 3600 * 24 * 365,
                                path: '/'
                            }))
                            res.json({message: "Добро пожаловать!"})
                        } else {
                            res.json({message: "Введённый пароль неверен"})
                        }
                    })
                }else{
                    throw Error("Введённый пользователь не существует или логин или пароль введёны неправильно")
                }
            } catch (e) {
                res.status(500).json({error: e.message})
            }
        },
=======
        POST: withSession(async (req, res) => {
            try {
                if (req.session.get("authToken")) return res.status(400).json({
                    errors: [{name:"common", message: "Вы уже авторизованы.", payload: {user: {isLoggedIn: true}}}]
                })
                const {email, password} = req.body
                const user = await User.findOne({email: email})

                if (user) {

                    const isCorrect = await compare(password, user.password)
                    if (isCorrect) {
                        const sessionId = uuidv4()
                        user.tokens.addToSet(sessionId)
                        await user.save()
                        const claims = {
                            sessionId: sessionId,
                            userId: user._id,
                            isLoggedIn: true
                        }
                        req.session.set("authToken", claims)
                        await req.session.save()
                        console.log("Отправляем сессию.")
                        return res.json({success:{message: "Вы успешно авторизовались.", payload: {user: {isLoggedIn: true}},}})
                    }
                }
                return res.status(400).json({
                    isLoggedIn: false,
                    errors: [{name: "common", message: "Неправильный email или пароль."}]
                })
            } catch (e) {
                res.status(500).json({error: [{name: 'common', message: e.message}]})
            }
        })
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
    })
)
