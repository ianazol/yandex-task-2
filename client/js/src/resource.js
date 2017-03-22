const API_PREFIX = "/api";
const DEFAULT_PREFIX = {"Content-type": "application/json; charset=UTF-8"};

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

    return fetch(API_PREFIX + "/" + type + "/" + query, {
        method: "get"
    }).then((response) => response.json());
}

function create(type, data) {
    return fetch(API_PREFIX + "/" + type + "/", {
        method: "post",
        headers: DEFAULT_PREFIX,
        body: JSON.stringify(data)
    }).then((response) => response.json());
}

function update(type, id, data) {
    return fetch(API_PREFIX + "/" + type + "/" + id, {
        method: "put",
        headers: DEFAULT_PREFIX,
        body: JSON.stringify(data)
    }).then((response) => response.json());
}

function remove(type, id) {
    return fetch(API_PREFIX + "/" + type + "/" + id, {
        method: "delete"
    }).then((response) => response.json());
}

export default {list, create, update, remove};