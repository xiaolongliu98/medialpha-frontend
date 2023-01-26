import req from "@/api/request";

export function getVideosPage({page}) {
    return req({
        method: 'GET',
        url: `/videos?page=${page}`,
    })
}

export function getVideo({id}) {
    return req({
        method: 'GET',
        url: `/video?id=${id}`,
    })
}