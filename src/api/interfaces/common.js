import req from "@/api/request";

export function getVersion() {
    return req({
        method: 'GET',
        url: `/common/version`,
    })
}