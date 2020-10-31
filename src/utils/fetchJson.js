import axios from "axios"


export async function userFetcher(url) {
    return axios.get(url).then(res => {
        return {...res.data.success.payload.user}
    }).catch(error => {
        return {...error.response.data}
    })
}