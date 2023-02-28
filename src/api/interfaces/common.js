import req from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {Base64} from "js-base64";


export function getVersion() {
    return req({
        method: 'GET',
        url: `/common/version`,
    })
}


// @router /common/reload/all GET
// func (CommonHandlerSet) ReloadAll(w http.ResponseWriter, req *http.Request) {
export function reloadAll() {
    return req({
        method: 'GET',
        url: `/common/reload/all`,
    })
}

// @query path[Abs Virtual(Unix) Path] required
// @router /common/syncdir/recursively GET
export function syncDirRecursively({path}) {
    if (!path) {
        path = ""
    }
    path = Base64.encode(path)
    return req({
        method: 'GET',
        url: `/common/syncdir/recursively?path=${path}`,
    })
}

// @query clear [yes, no]
// @router /common/task GET
export function getCurrentTask({clear}) {
    if (!clear) {
        clear = "yes"
    }

    return req({
        method: 'GET',
        url: `/common/task?clear=${clear}`,
    })
}


// @query path required
// @router /common/add/base GET
export function addBaseDir({localPath}) {
    if (!localPath) {
        throw new Error("参数为空")
    }
    localPath = Base64.encode(localPath)

    return req({
        method: 'GET',
        url: `/common/add/base?path=${localPath}`,
    })
}

// @router /common/get/base GET
export function getBaseDir() {
    return req({
        method: 'GET',
        url: `/common/get/base`,
    })
}

// @query path required
// @router /common/del/base GET
export function delBaseDir({localPath}) {
    if (!localPath) {
        throw new Error("参数为空")
    }
    localPath = Base64.encode(localPath)
    return req({
        method: 'GET',
        url: `/common/del/base?path=${localPath}`,
    })
}

// @query id required
// @router /common/cover/reload GET
export function reloadCover({id}) {
    if (!id) {
        throw new Error("参数为空")
    }
    return req({
        method: 'GET',
        url: `/common/cover/reload?id=${id}`,
    })
}

