import withSession from "@utils/withSession"
import withDb, {connectDb} from "@utils/dbConnect";
import mongoose from "mongoose";


const callbackHandlerApi = (callbackFunctions, routeApiHandler) => withSession(async (req, res) => {
    await connectDb()
        for (let i = 0; i < callbackFunctions.length; i++) {
            const message = await callbackFunctions[i](req, req.session.get("authToken"))
            if (message) {
                res.setHeader('location', '/signin')
                return res.status(302).json({
                    errors: [{
                        name: 'common',
                        message: message
                    }]
                })
            }
        }
    return withDb(routeApiHandler(req, res, req.session.get("authToken")))
})

export default callbackHandlerApi