/**
 * @desc 绑定事件
 */
export function on(elem, eventName, eventHandler, eventOptions = { capture: false}) {
    if (elem.addEventListener) {
        // capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
        // once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
        // passive: Boolean，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
        // mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
        elem.addEventListener(eventName, eventHandler, eventOptions)
    } else {
        elem.attachEvent("on" + eventName, eventHandler)
    }
}

/**
 * 在节点末尾插入一段 HTML 或一个节点，返回插入的新节点
 * @param node 要处理的节点
 * @param content 要插入的 HTML 或节点
 */
export function append(node, content) {
    node.appendChild(content)
}

/**
 * 删除指定节点
 * @param node 
 * @param selector 
 */
export function remove(node) {
    (node.parentNode || node.parentElement).removeChild(node)
}

/**
 * 根据选择器查询指定节点
 * @param node 要查询的节点
 * @param selector 要查询的选择器
 */
export function find(node, selector) {
    return node.querySelector(selector)
}


/**
 * 根据选择器查询所有符合的节点
 * @param node 
 * @param selector 
 */
export function query(node, selector) {
    return node.querySelectorAll(selector)
}