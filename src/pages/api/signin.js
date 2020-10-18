import {compare} from "bcrypt"
import jwt from "jsonwebtoken"


import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import User from '@models/User'

import {secret} from "@utils/secret"
import cookie from "cookie"



export default apiRoutesHandler(
    withDb({
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
    })
)
