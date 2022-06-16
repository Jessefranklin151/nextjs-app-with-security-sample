
const get = (endpoint: string, options?: any) => {
    return fetch(endpoint, options)
}

const post = (endpoint: string, body: any, options?: any) => {
    return fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
}

const put = (endpoint: string, body: any, options?: any) => {
    return fetch(endpoint, {
        method: "PUT", body: JSON.stringify(body), headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
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