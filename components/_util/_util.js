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
/** 所有提示文案 */
// const messages = {
//     requiredMessage: `该输入域为必填的`,
//     maxLengthMessage: `该字段最大长度为 {expected}，超出 {delta}`,
//     minLengthMessage: `该字段最少长度为 {expected}，缺少 {delta}`,
//     maxMessage: `该字段最大为 {expected}`,
//     minMessage: `该字段最小为 {expected}`,
//     patternMessage: `输入的格式不正确，请重新检查`,
//     validateErrorMessage: `该字段验证未通过`,
//     validateStartMessage: `正在验证中...`,
//     validateStartMessagePrefix: `<i class="x-icon x-spin">҉</i> `,
//     validateInfoMessagePrefix: `<i class="x-icon">🛈</i> `,
//     validateSuccessMessagePrefix: `<i class="x-icon">✓</i> `,
//     validateWarningMessagePrefix: `<i class="x-icon">⚠</i> `,
//     validateErrorMessagePrefix: `<i class="x-icon">&#10071;</i> `
// }