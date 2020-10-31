import jwt from "jsonwebtoken"
import {secret} from "@utils/secret"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import withDb from "@utils/dbConnect"
import User from "@models/User"
<<<<<<< HEAD
=======
import dbErrorCompile from "@utils/dbErrorCompile"
import withSession from "@utils/withSession"
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation



export default apiRoutesHandler(
    withDb({
<<<<<<< HEAD
        POST: async (req, res) => {
            try {
                const decoded = jwt.verify(req.cookies.authToken, secret)
                const user = await User.findById(decoded._id)

                const tokenIndex = user.tokens.indexOf(req.cookies.authToken)
                user.tokens.splice(tokenIndex, 1)
                await  user.save()

                res.setHeader('Set-Cookie', 'authToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
                res.status(200).json({message:"logout successful"})
            }catch (e) {
                res.status(500).json({error: e.message})
            }
        }
    })
=======
        POST: withSession(async (req, res) => {
            try {
                const session = req.session.get("authToken")
                if(!session){
                    return res.status(400).send({errors:[{name:'common', message:"Вы уже вышли."}]})
                }

                const user = await User.findById(session.userId)
                if(!user){
                    return res.status(404).send({errors:[{name:'common', message:"Пользователя не найдено."}]})
                }
                user.tokens.pull(session.sessionId)
                await user.save((err) => {
                    if(err) {
                        return dbErrorCompile(err, res)
                    }
                })
                req.session.destroy()
                res.status(200).json({success:[{name:'common', message:"Вы успешно вышли из аккаунта"}]})
            }catch (e) {
                res.status(500).json({errors:[{name:'common', message:e.message}]})
            }
        })
    })

>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
)

