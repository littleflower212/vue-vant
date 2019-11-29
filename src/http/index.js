import axios from 'axios'

let globalCatch = (result) => {
    let message = 'js error'
    if (result && result.response && result.response.data) {
        message = result.response.data
    }
    throw new Error(message)
}

export function get(url) {
    return axios.get(url).catch(globalCatch)
}

export function post(url, data) {
    let axiosOpts = {
        method: 'post',
        url,
        params: {},
        data
    }
    return axios(axiosOpts).catch(globalCatch)
}
export default {
    get,
    post
}