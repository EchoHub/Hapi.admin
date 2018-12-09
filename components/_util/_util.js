import * as DOM from "dom/dom"
import ToolTip from "toolTip/toolTip"
/**
 * 获取cookie值
 * @param name
 */
export function getCookie(name) {
    const cookie = document.cookie;
    let result = ""
    let cookieJson = {}
    if(cookie) {
        const _params = cookie.split("&");
        for(const _param of _params) {
            cookieJson[_param.split("=")[0]] = _param.split("=")[1];
        }
        return cookieJson[name]
    }
    return result;
}
/**
 * @desc 元素属性过滤
 * @param 目标对象
 * @param 属性
 */
export function propsFilter(target, props) {
    if (!target) return {}
    const __proto__ = target.__proto__
    let result = {}
    for (const _prop in props) {
        for (const prop in __proto__) {
            if (_prop === prop) {
                result[_prop] = props[_prop]
                break;
            }
        }
    }
    return result
}

/**
 * @desc 组件表单校验
 * @param elem 对应dom节点
 * @param val 值
 * @param options 校验项
 */
export function reportValidity(elem, val, options) {
    let report = {
        elem: elem,
        valid: true,
        message: ""
    };
    const { required, pattern, patternMessage, max, min, maxLength, minLength } = options
    let msg = "", valid = true
    if (required) {
        if (val.replace(/\s/g, "") === "") {
            msg = "该输入域为必填的"
            valid = false
        } else if (pattern && !pattern.test(val)) {
            msg = patternMessage
            valid = false
        } else if (max !== undefined) {
            if (isNaN(+val)) {
                msg = `该字段类型错误`
            } else if (max < val) {
                msg = `该字段最大为${max}`
            }
            valid = false
        } else if (min !== undefined) {
            if (isNaN(+val)) {
                msg = `该字段类型错误`
            } else if (min > val) {
                msg = `该字段最小为${max}`
            }
            valid = false
        } else if (maxLength !== undefined && val.toString().length > maxLength) {
            msg = `该字段最大长度为${maxLength}`
            valid = false
        } else if (minLength !== undefined && val.toString().length < minLength) {
            msg = `该字段最小长度为${minLength}`
            valid = false
        }
        report = {
            elem: elem,
            valid: valid,
            message: msg
        };
        const span = document.createElement("span")
        span.className = "hp-tooltip"
        span.innerHTML = msg;
        const parentNode = (elem.parentNode || elem.parentElement);
        const toolTip = DOM.find(parentNode, ".hp-tooltip");
        if (!toolTip) DOM.append(parentNode, span)
        else {
            toolTip.innerHTML = msg
        }
    } else {
        const parentNode = (elem.parentNode || elem.parentElement);
        const toolTip = DOM.find(parentNode, ".hp-tooltip");
        toolTip && DOM.remove(toolTip)
    }
    return report
}
/**
 * @desc 去重
 * @param {*} arr 
 */
export function unique(arr) {
    var res = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        for (var j = 0, jlen = res.length; j < jlen; j++) {
            if (res[j] === obj) break;
        }
        if (jlen === j) res.push(obj);
    }
    return res;
}

export function paramFormat(str) {
    if(str === undefined || str === null) return ""
    return str
}