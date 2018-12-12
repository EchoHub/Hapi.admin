/**
 * 绑定事件
 * @param elem
 * @param eventName
 * @param eventHandler
 * @param eventOptions
 */
export function on(elem, eventName, eventHandler, eventOptions = { capture: false }) {
    let elems = []
    if (Object.prototype.toString.call(elem) !== "[object NodeList]") {
        elems = [elem]
    } else {
        elems = Array.prototype.slice.call(elem)
    }
    for (const _elem of elems) {
        if (_elem.addEventListener) {
            // capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
            // once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
            // passive: Boolean，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
            // mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
            _elem.addEventListener(eventName, eventHandler, eventOptions)
        } else {
            _elem.attachEvent("on" + eventName, eventHandler)
        }
    }
}
/**
 * 解除绑定事件
 * @param elem
 * @param eventName
 * @param eventHandler
 * @param useCapture // 指定移除事件句柄的阶段 true - 在捕获阶段移除事件句柄 false- 默认。在冒泡阶段移除事件句柄
 */
export function off(elem, eventName, eventHandler, useCapture) {
    if(elem.removeEventListener) {
        elem.removeEventListener(eventName, eventHandler, useCapture)
    }else {
        elem.detachEvent("on" + eventName, eventHandler)
    }
}
/**
 * 在节点末尾插入一段 HTML 或一个节点，返回插入的新节点
 * @param elem 要处理的节点
 * @param content 要插入的 HTML 或节点
 */
export function append(elem, content) {
    elem.appendChild(content)
}

/**
 * 删除指定节点
 * @param elem 
 * @param selector 
 */
export function remove(elem) {
    (elem.parentNode || elem.parentElement).removeChild(elem)
}

/**
 * 根据选择器查询指定节点
 * @param elem 要查询的节点
 * @param selector 要查询的选择器
 */
export function find(elem, selector) {
    return elem.querySelector(selector)
}


/**
 * 根据选择器查询所有符合的节点
 * @param elem 
 * @param selector 
 */
export function query(elem, selector) {
    return elem.querySelectorAll(selector)
}

/**
 * 向上寻找指定节点
 * @param elem
 * @param selector
 */
export function closest(elem, selector) {
    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
    while (elem) {
        if (matchesSelector.call(elem, selector)) {
            break;
        }
        elem = elem.parentElement;
    }
    return elem;
}

/**
 * 判断元素是否已添加指定的 CSS 类名
 * @param elem 要处理的元素
 * @param className 要判断的 CSS 类名（只能有一个）
 */
export function hasClass(elem, className) {
    return (" " + elem.className + " ").indexOf(" " + className + " ") >= 0
}

/**
 * 对指定元素新增样式类
 * @param elem
 * @param className
 */
export function addClass(elem, className) {
    toggleClass(elem, className, true)
}
/**
 * 对指定元素删除样式类
 * @param elem
 * @param className
 */
export function removeClass(elem, className) {
    toggleClass(elem, className, false)
}

/**
 * 如果存在（不存在）则删除（添加）元素的 CSS 类名
 * @param elem 要处理的元素
 * @param className 要添加或删除的 CSS 类名（只能有一个）
 * @param value 如果为 true 则强制添加 CSS 类名，如果为 false 则强制删除 CSS 类名
 * @example toggleClass(document.body, "light")
 */
export function toggleClass(elem, className, value) {
    if (hasClass(elem, className)) {
        if (!value) {
            elem.className = (" " + elem.className + " ").replace(" " + className + " ", " ").trim()
        }
    } else if (value === undefined || value) {
        elem.className = elem.className ? elem.className + " " + className : className
    }
}