import React, { Component } from "react";
import { render, findDOMNode } from "react-dom";
import * as DOM from "dom/dom";
import classNames from "classnames";
import "./notification.scss";

export default class Notification extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const _self = findDOMNode(this);
        const notices = DOM.query(document.body, ".hp-notification");
        notices.length > 1 && (_self.style.top = (() => {
            const preNotice = notices[notices.length - 2];
            return preNotice.offsetTop + preNotice.offsetHeight + 10 + "px";
        })());
        const rightTimer = setTimeout(() => {
            _self.style.right = "30px";
            clearTimeout(rightTimer);
        }, 10);

        if (this.props.autoClose) {
            const removeTimer = setTimeout(() => {
                this.closeHandle();
                clearTimeout(removeTimer);
            }, this.props.duration);
        }
    }

    closeHandle() {
        const _self = findDOMNode(this);
        const notices = DOM.query(document.body, ".hp-notification");
        let index = 0
        // 定位当前元素位置
        for (const key in notices) {
            if (notices[key] === _self) index = key
        }
        _self.style.right = "-999px";
        const moveHeight = _self.offsetHeight + 10
        const removeTimer = setTimeout(() => {
            (_self.parentElement || _self.parentNode).remove();
            clearTimeout(removeTimer);
            // 当前元素后面兄弟元素上移
            if (notices.length) {
                for (const k in notices) {
                    if (k > index && notices[k].style) notices[k].style.top = notices[k].offsetTop - moveHeight + "px";
                }
            }
        }, 500);
    }

    render() {
        const { className, prefixCls, iconPrefixCls, iconEnum, theme, themeEnum, content, isFlag, title } = this.props;
        const classes = classNames(className, prefixCls)
        const iconClasses = classNames(iconPrefixCls, {
            [`${iconEnum[theme]}`]: theme,
            [`${themeEnum[theme]}`]: themeEnum
        })
        return <div className={classes}>

            <div className="">
                <div className="hp-notification-title">
                    {
                        isFlag ? <div className="hp-notification-flag">
                            <span className={iconClasses}>
                            </span>
                        </div> : null
                    }
                    {title}
                    <span className={`hp-notification-close icon iconfont icon-close`}
                        onClick={e => { this.closeHandle() }}></span>
                </div>
                <div className="hp-notification-content">{content}</div>
            </div>
        </div>
    }
}
Notification.defaultProps = {
    className: "",
    prefixCls: "hp-notification",
    iconPrefixCls: "icon iconfont",
    title: "消息通知",
    theme: "default",
    autoClose: true,
    isFlag: false,
    content: "",
    duration: "4500",
    iconEnum: {
        "default": "",
        "info": "icon-prompt",
        "success": "icon-success",
        "warning": "icon-warning",
        "error": "icon-delete"
    },
    themeEnum: {
        "default": "",
        "info": "primary",
        "success": "success",
        "warning": "warning",
        "error": "error"
    }
}
export class Notice {
    show(options) {
        this.createNotification(options)
    }
    /**
     * @desc 创建一个消息通知框
     * @param {*} options 
     */
    static info(options) {
        Notice.createNotification(options, "info", true)
    }
    /**
     * @desc 创建一个成功消息通知框
     * @param {*} options 
     */
    static success(options) {
        Notice.createNotification(options, "success", true)
    }
    /**
     * @desc 创建一个错误消息通知框
     * @param {*} options 
     */
    static error(options) {
        Notice.createNotification(options, "error", true)
    }
    /**
     * @desc 创建一个警告消息通知框
     * @param {*} options 
     */
    static warning(options) {
        Notice.createNotification(options, "warning", true)
    }

    static createNotification(options, theme, isFlag) {
        const key = options.key;
        const noticeElem = DOM.find(document.body, `[data-key=${key}]`);
        if (key === undefined || !noticeElem) {
            const notificationContainer = document.createElement("div");
            notificationContainer.className = "hp-notification-container";
            notificationContainer.setAttribute("data-key", options.key)
            DOM.append(document.body, notificationContainer);
            render(<Notification {...options} theme={theme} isFlag={isFlag}></Notification>, notificationContainer);
            return
        }
        render(options.content, DOM.find(noticeElem, ".hp-notification-content"));
    }

    info(options) {
        Notice.createNotification(options, "info", true)
    }

    success(options) {
        Notice.createNotification(options, "success", true)
    }

    error(options) {
        Notice.createNotification(options, "error", true)
    }

    warning(options) {
        Notice.createNotification(options, "warning", true)
    }
}

Notice.defaultProps = {}