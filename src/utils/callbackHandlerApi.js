import withSession from "@utils/withSession"


const callbackHandlerApi = (callbackFunctions, routeApiHandler) => withSession(async (req, res) => {
    const userSession = req.session.get("authToken")
    for (let i = 0; i < callbackFunctions.length; i++) {
        const message = await callbackFunctions[i](req, userSession)
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
    return routeApiHandler(req, res, req.session.get("authToken"))
})

export default callbackHandlerApi