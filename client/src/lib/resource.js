const API_PREFIX = "/api";
const DEFAULT_HEADERS = {"Content-type": "application/json; charset=UTF-8"};

function getQueryString(params) {
    return Object.keys(params).map(function (key) {
        if (Array.isArray(params[key])) {
            return params[key].map(function (val) {
                return encodeURIComponent(key) + "[]=" + encodeURIComponent(val);
            }).join('&');
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
}

function list(type, params) {
    let query = '';

    if (params !== undefined) {
        query = "?" + getQueryString(params);
    }

    return fetch(`${API_PREFIX}/${type}/${query}`, {
        method: "get"
    }).then(res => res.json());
}

function create(type, data) {
    return fetch(`${API_PREFIX}/${type}/`, {
        method: "post",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function update(type, id, data) {
    return fetch(`${API_PREFIX}/${type}/${id}`, {
        method: "put",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function remove(type, id) {
    return fetch(`${API_PREFIX}/${type}/${id}`, {
        method: "delete"
    }).then(res => res.json());
}

export default {list, create, update, remove};