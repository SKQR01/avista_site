import jwt from "jsonwebtoken"
import {secret} from "@utils/secret"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import withDb from "@utils/dbConnect"
import User from "@models/User"



export default apiRoutesHandler(
    withDb({
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
)

