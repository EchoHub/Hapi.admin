/**
 * 
 * @param {@desc 指定元素全屏显示} element 
 */
export function fullScreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
}

/**
 * @param {@desc 获取对象类型字符串} object
 */
export function typeToString(object) {
    return Object.prototype.toString.call(object)
}