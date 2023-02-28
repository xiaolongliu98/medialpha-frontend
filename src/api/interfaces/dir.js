import req from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {Base64} from "js-base64";

// @query page, path optional
// @router /dir/list GET
export function listDirs({page, path}) {
    if (page === undefined) {
        page = 0
    }
    if (path === undefined) {
        path = ""
    }
    path = Base64.encode(path)

    return req({
        method: 'GET',
        url: `/dir/list?path=${path}&page=${page}`,
    })
}

// @query page optional, key required
// @router /dir/search GET
export function searchDirs({page, key}) {
    if (page === undefined) {
        page = 0
    }
    if (key === undefined) {
        key = ""
    }
    key = Base64.encode(key)
    return req({
        method: 'GET',
        url: `/dir/search?key=${key}&page=${page}`,
    })
}



