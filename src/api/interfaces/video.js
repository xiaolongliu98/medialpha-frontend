import req from "@/api/request";

export function getVideosPage({page}) {
    return req({
        method: 'GET',
        url: `/videos?page=${page}`,
    })
}