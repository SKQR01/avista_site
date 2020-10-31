<<<<<<< HEAD


const callbackHandlerApi = (callbackFunctions, routeApiHandler) => async (req, res) => {
    for (let i = 0; i < callbackFunctions.length; i++) {
        if (await callbackFunctions[i](req) !== true) {
            return res.status(500).json({error: "Что-то пошло не так. Возможно, вы не имеете прав на это действие."})
        }
    }
    return routeApiHandler(req, res)
}
=======
import withSession from "@utils/withSession"


const callbackHandlerApi = (callbackFunctions, routeApiHandler) => withSession(async (req, res) => {
    const userSession = req.session.get("authToken")
    for (let i = 0; i < callbackFunctions.length; i++) {
        const message = await callbackFunctions[i](req, userSession)
        if (message && userSession) {
            return res.status(403).json({
                loggedIn: false,
                errors: [{
                    name: 'common',
                    message: message
                }]
            })
        }
    }
    return routeApiHandler(req, res, req.session.get("authToken"))
})
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation

export default callbackHandlerApi