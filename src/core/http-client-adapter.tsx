
const get = (endpoint: string, options?: any) => {
    return fetch(endpoint, options)
}

const post = (endpoint: string, body: any, options?: any) => {
    return fetch(endpoint, { body, method: "POST" })
}

const put = (endpoint: string, body: any, options?: any) => {
    return fetch(endpoint, { body, method: "PUT" })
}

const del = (endpoint: string, options?: any) => {
    return fetch(endpoint, { method: "DELETE" })
}

const HttpClient = {
    get,
    post,
    put,
    del
}

export default HttpClient;