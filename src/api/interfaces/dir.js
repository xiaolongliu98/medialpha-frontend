import req from "@/api/request";

// @query page, path optional
// @router /dir/list GET
export function listDirs({page, path}) {
    if (page === undefined) {
        page = 0
    }
    if (path === undefined) {
        path = ""
    }

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

    return req({
        method: 'GET',
        url: `/dir/search?key=${key}&page=${page}`,
    })
}