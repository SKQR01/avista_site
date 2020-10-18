import withDb from "@utils/dbConnect"
import apiRoutesHandler from "@utils/apiRoutesHandler"
import User from '@models/User'



export default apiRoutesHandler(
    withDb({
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
    })
)
