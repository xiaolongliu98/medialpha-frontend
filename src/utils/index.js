// 一些工具方法


export function parseSeconds(sec) {
    let hour = Math.floor(sec / 3600)
    let minute = Math.floor((sec % 3600) / 60)
    let second = Math.floor(sec - hour * 3600 - minute * 60)

    if (second < 10) {
        second = `0${second}`
    } else {
        second = String(second)
    }
    if (minute < 10) {
        minute = `0${minute}`
    } else {
        minute = String(minute)
    }
    hour = String(hour)
    return {hour, minute, second}
}

/**
 * 获取字符串的显示宽度/高度
 * @param {} text //字符串
 * @param {} fontsize //字符串
 */
export function textWidth(text, fontsize) {
    var span = document.createElement('span')
    var result = {}
    result.width = span.offsetWidth
    result.height = span.offsetHeight
    span.style.visibility = 'hidden'
    if (fontsize) {
        span.style.fontSize = fontsize
    } else {
        span.style.fontSize = '12px'
    }
    // span.style.fontFamily = fontFamily
    span.style.display = 'inline-block'
    document.body.appendChild(span)
    if (typeof span.textContent !== 'undefined') {
        span.textContent = text
    } else {
        span.innerText = text
    }
    result.width = parseFloat(window.getComputedStyle(span).width) - result.width
    result.height = parseFloat(window.getComputedStyle(span).height) - result.height
    return result
}

export function formatSize(size) {
    size = size / 1024 / 1024 //MB
    let unit = "MB"
    if (size >= 1024) {
        size /= 1024
        unit = "GB"
    }
    return size.toFixed(2) + unit
}