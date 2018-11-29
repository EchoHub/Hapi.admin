import * as DOM from "dom/dom"
import ToolTip from "toolTip/toolTip"
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
    const { required, pattern, patternMessage, max, min } = options
    if (
        (required && val.replace(/\s/g, "") === "")
        || (pattern && !pattern.test(val))
    ) {
        report = {
            elem: elem,
            valid: false,
            message: patternMessage
        };
        const span = document.createElement("span")
        span.className = "hp-tooltip"
        span.innerHTML = patternMessage;
        const parentNode = (elem.parentNode || elem.parentElement);
        const toolTip = DOM.find(parentNode, ".hp-tooltip");
        if (!toolTip) DOM.append(parentNode, span)
        else {
            toolTip.innerHTML = patternMessage
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