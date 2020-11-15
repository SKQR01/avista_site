import apiRoutesHandler from "@utils/apiRoutesHandler"
import UserBusinessStatus from '@models/UserBusinessStatus'


import callbackHandlerApi from "@utils/callbackHandlerApi";
import {checkAuthentication} from "@utils/callbackHandlerApiFunctions";


export default apiRoutesHandler(
     {
        GET: callbackHandlerApi([checkAuthentication],async (req, res) => {
            try {
                const statuses = await UserBusinessStatus.find().lean()

                return res.json({success: {name: 'common', payload: {userStatuses: statuses}}})

            } catch (e) {
                res.status(500).send({errors: [{name: 'common', message: e.message}]})
            }
        })
    }
)
