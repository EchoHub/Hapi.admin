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

/**
 * 清除指定数据
 * @param {*} source 源数据
 * @param {*} target 需要去除的目标数据
 */
export function arrayEliminator(source, target) {
    let result = []
    for (const item of source) {
        let shouldRemove = false;
        for (const ite of target) {
            if (typeof ite === "object" && typeof item === "object") {
                shouldRemove = objectCompare(ite, item)
                if(shouldRemove) break
            } else {
                if (ite === item) {
                    shouldRemove = true;
                    break;
                }
            }
        }
        !shouldRemove && result.push(item)
    }
    return result
}

export function objectCompare(obj1, obj2) {
    let allSame = true
    for (const key_1 in obj1) {
        let isSame = false;
        for (const key_2 in obj2) {
            if (obj1[key_1] === obj2[key_2]) {
                isSame = true;
                break;
            }
        }
        if (!isSame) {
            allSame = false
            break
        }
    }
    return allSame
}