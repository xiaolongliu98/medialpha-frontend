import req from "@/api/request";

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


// @router /common/reload/all/status GET
// func (CommonHandlerSet) GetReloadAllStatus(w http.ResponseWriter, req *http.Request) {
export function getReloadAllStatus() {
    return req({
        method: 'GET',
        url: `/common/reload/all/status`,
    })
}