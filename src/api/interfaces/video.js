import req from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {Base64} from "js-base64";

export function getPage({page}) {
    if (page === undefined) {
        page = 0
    }
    return req({
        method: 'GET',
        url: `/videos?page=${page}`,
    })
}

export function get({id}) {
    if (id === undefined) {
        id = 0
    }
    return req({
        method: 'GET',
        url: `/video?id=${id}`,
    })
}

export function searchByName({key, page}) {
    if (page === undefined) {
        page = 0
    }
    key = Base64.encode(key)
    return req({
        method: 'GET',
        url: `/video/search?key=${key}&page=${page}`,
    })
}

// @query page optional, path required
// @router /dir/videos GET
export function getByVirtualPath({path, page}) {
    if (page === undefined) {
        page = 0
    }
    path = Base64.encode(path)
    return req({
        method: 'GET',
        url: `/dir/videos?path=${path}&page=${page}`,
    })
}