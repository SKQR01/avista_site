

const callbackHandlerApi = (callbackFunctions, routeApiHandler) => async (req, res) => {
    for (let i = 0; i < callbackFunctions.length; i++) {
        if (await callbackFunctions[i](req) !== true) {
            return res.status(500).json({error: "Что-то пошло не так. Возможно, вы не имеете прав на это действие."})
        }
    }
    return routeApiHandler(req, res)
}

export default callbackHandlerApi