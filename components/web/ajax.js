/**
 * 发送一个异步请求。
 * @param options 发送的选项。
 * @return 返回请求对象。
 */
export function ajax(options) {
    const r = new Ajax();
    Object.assign(r, options);
    if (r.data != undefined && !(r.data instanceof FormData)) {
        r.contentType = r.contentType || "application/x-www-form-urlencoded";
        if (typeof r.data === "object") {
            r.data = r.contentType === "application/json" && r.type !== "GET" ? JSON.stringify(r.data) : formatQuery(r.data);
        }
        if (r.type === "GET") {
            r.url = appendQuery(r.url, r.data);
            r.data = null;
        }
    }
    r.send();
    return r;
}

/**
 * 表示一个异步请求。
 */
export class Ajax {

    /**
     * 请求的类型（方法、谓词）。请求类型应全大写。
     * @default "GET"
     */
    type

    /**
     * 请求的地址。可以是相对于当前页面地址的相对地址。
     * @default location.href
     */
    url

    /**
     * 请求的数据。可以是字符串、JSON 对象或 FormData。
     */
    data

    /**
     * 请求数据的 MIME 类型。
     */
    contentType

    /**
     * 附加的请求头。
     */
    headers

    /**
     * 服务器的用户名。
     */
    username

    /**
     * 服务器的密码。
     */
    password

    /**
     * 是否发送用户凭证（如 Cookie 登陆信息）。
     */
    withCredentials

    /**
     * 响应数据的类型。
     * @desc 其中 "arraybuffer" 和 "blob" 仅支持：CH 31+、FF 12+、IE 10+、OP 18+、SF 7.1+、Android 4.4.1+。
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
     */
    responseType

    /**
     * 请求的超时毫秒数。如果小于 0 则不设置超时。
     */
    timeout

    /**
     * 获取底层发送请求的对象。
     */
    xhr

    /**
     * 获取服务器返回的状态码。如果小于 0 表示请求未发出。
     */
    status

    /**
     * 获取服务器响应的数据。数据的类型根据 *responseType* 决定。
     */
    response

    /**
     * 获取响应头。
     * @param name 响应头。
     * @return 返回响应头数据。如果响应头不存在则返回 null。
     */
    getResponseHeader(name) {
        return this.xhr && this.xhr.getResponseHeader(name);
    }

    /**
     * 请求开始的回调函数。
     * @param sender 当前请求对象。
     */
    start
    
    /**
     * 请求成功的回调函数。
     * @param response 响应的数据。
     * @param sender 当前请求对象。
     */
    success

    /**
     * 请求失败的回调函数。
     * @param error 错误的信息文本或对象。
     * @param sender 当前请求对象。
     */
    error

    /**
     * 请求完成的回调函数。无论请求是否成功都会执行此回调。
     * @param error 如果请求错误，则值为错误的信息文本或对象。
     * @param sender 当前请求对象。
     */
    complete

    /**
     * 发送请求。
     * @return 如果请求发送成功则返回 true，否则返回 false。
     */
    send() {
        this.sending = true;
        const xhr = this.xhr = new XMLHttpRequest();
        this.start && this.start(this);
        try {
            xhr.open(this.type, this.url, true, this.username, this.password);
        } catch (ieOpenError) {
            // IE：地址错误时可能产生异常。
            this.progress(ieOpenError, -3);
            return false;
        }

        for (const header in this.headers) {
            try {
                xhr.setRequestHeader(header, this.headers[header]);
            } catch (firefoxSetHeaderError) {
                // FF：跨域时设置头可能产生异常。
            }
        }
        if (this.contentType) {
            try {
                xhr.setRequestHeader("Content-Type", this.contentType);
            } catch (firefoxSetHeaderError) {
                // FF：跨域时设置头可能产生异常。
            }
        }
        if (this.withCredentials) {
            xhr.withCredentials = true;
        }
        if (this.responseType && (this.responseType === "arraybuffer" || this.responseType === "blob")) {
            xhr.responseType = this.responseType;
        }

        try {
            xhr.onreadystatechange = this.progress.bind(this);
            xhr.send(this.data);
        } catch (sendError) {
            // 地址错误时会产生异常。
            this.progress(sendError, -4);
            return false;
        }
        if (this.timeout >= 0) {
            setTimeout(this.progress.bind(this), this.timeout, "Timeout", -2);
        }

        return true;
    }

    /**
     * 处理请求状态改变的回调函数。
     * @param data 数据。
     * @param internalError 如果是内置错误则值为内置错误码。
     */
    progress(data, internalError) {
        const xhr = this.xhr;
        try {
            // 仅当正在发送请求且请求已完成时继续执行。
            if (!this.sending || !internalError && xhr.readyState !== 4) {
                return;
            }
            this.sending = false;

            // 删除 readystatechange 以避免有些浏览器的内存泄露。
            xhr.onreadystatechange = null;

            // 处理内置错误。
            if (internalError) {
                this.status = internalError;
                if (xhr.readyState !== 4) {
                    xhr.abort();
                }
            } else if (checkStatus(this.status = xhr.status)) {
                try {
                    switch (this.responseType) {
                        case "text":
                        this.response = xhr.responseText;
                        break;
                        case undefined:
                        case "json":
                            this.response = JSON.parse(xhr.responseText);
                            break;
                        case "document":
                            this.response = xhr.responseXML;
                            break;
                        default:
                            this.response = xhr.response;
                            break;
                    }
                    data = undefined;
                } catch (responseError) {
                    // 解析响应数据报错。
                    // IE6-9：请求二进制格式的文件报错。
                    this.status = -6;
                    this.response = undefined;
                    data = responseError;
                }
            } else {
                data = xhr.statusText || "Access denied";
            }
        } catch (firefoxAccessError) {
            this.progress(firefoxAccessError, -5);
            return;
        }

        // 触发回调。
        if (data === undefined) {
            this.success && this.success(this.response, this);
        } else {
            this.error && this.error(data, this);
        }
        this.complete && this.complete(data, this);
    }

    /**
     * 判断是否正在发送请求。
     */
    sending

    /**
     * 终止当前请求。
     */
    abort() {
        this.progress("Aborted", -1);
    }

}

Ajax.prototype.type = "GET";
Ajax.prototype.url = "";

/**
 * 判断一个 HTTP 状态码是否表示正确响应。
 * @param status 要判断的状态码。
 * @return 如果正确则返回 true, 否则返回 false 。一般地，2xx、304、1223 被认为是正确的状态吗。
 */
export function checkStatus(status) {
    if (!status) {
        const protocol = window.location.protocol;
        // CH：status 在有些协议不存在。
        return protocol === "file:" || protocol === "chrome:" || protocol === "app:";
    }
    return status >= 200 && status < 300 || status === 304 || status === 1223;
}

/**
 * 格式化对象为查询字符串（如“foo=1&goo=2&goo=3”）。
 * @param obj 要格式化的对象。
 * @param separator 不同查询参数的分隔符。
 * @param equal 查询参数名和参数值的分隔符。
 * @return 返回格式化后的字符串。
 * @example formatQuery({ a: "2", c: "4" }) // "a=2&c=4"
 * @example formatQuery({ a: [2, 4] }) // "a=2&a=4"
 */
export function formatQuery(obj, separator = "&", equal = "=") {
    const parts = [];
    for (const key in obj) {
        const value = obj[key];
        if (Array.isArray(value)) {
            for (const item of value) {
                parts.push(`${key}${equal}${encodeURIComponent(item)}`);
            }
        } else {
            parts.push(`${key}${equal}${encodeURIComponent(value)}`);
        }
    }
    return parts.join(separator);
}

/**
 * 获取地址中指定的查询参数值。
 * @param name 查询参数名。
 * @param url 原地址。
 * @return 返回查询参数值。如果找不到则返回 null。
 * @example getQuery("foo", "?foo=1") // "1"
 * @example getQuery("goo", "?foo=1") // null
 */
export function getQuery(name, url = location.href) {
    let match = /\?([^#]*)/.exec(url);
    if (match) {
        match = new RegExp("(?:^|&)" + encodeURIComponent(name).replace(/([\-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^&]*)(?:&|$)", "i").exec(match[1]);
        if (match) {
            return decodeURIComponent(match[1]);
        }
    }
    return null;
}

/**
 * 设置地址中指定的查询参数值。
 * @param name 查询参数名。
 * @param value 要设置的查询参数值。如果值为 null 则删除指定的查询参数。
 * @param url 原地址。
 * @return 返回设置后的新地址。如果原参数不存在则添加到末尾。
 * @example setQuery("foo", "1", "page.html") // "page.html?foo=1"
 * @example setQuery("foo", "2", "page.html?foo=1") // "page.html?foo=2"
 * @example setQuery("foo", null, "page.html") // "page.html"
 */
export function setQuery(name, value, url = location.href) {
    // const match = /^(.*?)(\?.*?)?(#.*)?$/.exec(url)!;
    const match = /^(.*?)(\?.*?)?(#.*)?$/.exec(url);
    match[0] = "";
    if (value != null) {
        value = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    }
    if (match[2]) {
        match[2] = match[2].replace(new RegExp("([?&])" + name.replace(/([-.*+?^${}()|[\]\/\\])/g, "\$1") + "(=[^&]*)?(&|$)"), (source, left, oldValue, right) => {
            source = value == null ? right && left : left + value + right;
            // 标记已解析过。
            value = null;
            return source;
        });
    }
    if (value != null) {
        match[2] = (match[2] ? match[2] === "?" ? "?" : match[2] + "&" : "?") + value;
    }
    return match.join("");
}

/**
 * 在地址后添加请求参数。
 * @param url 地址。
 * @param query 要添加的请求参数，以查询字符串格式且不含“?”。
 * @return 返回已添加的新地址。
 * @example appendQuery("index.html", "from=link") // "index.html?from=link"
 */
export function appendQuery(url, query) {
    return query != null ? url + (url.indexOf("?") >= 0 ? "&" : "?") + query : url;
}
