import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode, render } from "react-dom";
import classNames from "classnames";
import * as DOM from "dom/dom";
import { Button } from "common";
import "./dialog.scss"

export default class Dialog extends Component {
    constructor(props) {
        super(props)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.close = this.close.bind(this)
        this.show = this.close.bind(this)
    }
    componentDidMount() {
        const dialog = findDOMNode(this);
        const width = dialog.offsetWidth;
        const height = dialog.offsetHeight;
        dialog.style = `margin-left: -${width / 2}px;margin-top: -${height / 2}px;transform:scale(1)`;
    }
    render() {
        const { prefixCls, className, title, children, buttons } = this.props
        const classes = classNames(prefixCls, className)

        const _buttons = []
        if (buttons && Object.prototype.toString.call(buttons) && Object.keys(buttons).length) {
            for (const key in buttons) {
                _buttons.push({
                    name: key,
                    type: buttons[key] ? true : false
                })
            }
        }
        return <div className={classes}>
            <div className="hp-dialog-header">{title}
                <i
                    className="icon iconfont icon-delete"
                    onClick={this.close}
                ></i>
            </div>
            <div className="hp-dialog-container">{children}</div>
            {buttons ? <div className="hp-dialog-footer">
                <ul className="hp-dialog-ul">
                    {
                        _buttons.map((button, index) => {
                            return <li key={`${index}`}>
                                <Button
                                    className={`${button.type ? "hp-button-primary" : ""}`}
                                    onClick={button.type ? this.onOk : this.onCancel}
                                >{button.name}
                                </Button>
                            </li>
                        })
                    }
                </ul>
            </div> : null}
        </div>
    }

    onOk() {
        const { onOk } = this.props;
        onOk instanceof Function && onOk()
        this.close()
    }

    onCancel() {
        const { onCancel } = this.props;
        onCancel instanceof Function && onCancel()
        this.close()
    }

    close() {
        const el = findDOMNode(this);
        el.style = "transform:scale(0)";
        const timer = setTimeout(() => {
            DOM.remove(el.parentElement || el.parentNode)
            clearTimeout(timer);
        }, 300)
    }

    static show(content, title, buttons, onOk, onCancel) {
        const modalContainer = document.createElement("div");
        modalContainer.className = "hp-dialog-mask";
        document.body.appendChild(modalContainer);
        render(<Dialog
            title={title}
            buttons={buttons}
            onOk={onOk}
            onCancel={onCancel}
        >{content}</Dialog>, modalContainer)
    }

    static confirm(content, title, onOk, onCancel) {
        const modalContainer = document.createElement("div");
        modalContainer.className = "hp-dialog-mask";
        document.body.appendChild(modalContainer);
        render(<Dialog
            title={title}
            buttons={{ 确认: true, 取消: false }}
            onOk={onOk}
            onCancel={onCancel}
        ><div className="p-1rem"><i className="hp-dialog-confirm_icon icon iconfont icon-feedback_fill"></i>{content}</div></Dialog>, modalContainer)
    }

    static info(content, title) {
        Dialog.alert(content, title, "prompt")
    }
    static success(content, title) {
        Dialog.alert(content, title, "success")
    }
    static warning(content, title) {
        Dialog.alert(content, title, "warning")
    }
    static error(content, title) {
        Dialog.alert(content, title, "delete")
    }

    static alert(content, title, theme = "prompt") {
        const modalContainer = document.createElement("div");
        modalContainer.className = "hp-dialog-mask";
        document.body.appendChild(modalContainer);
        const colorEnum = {
            prompt: "primary",
            success: "success",
            warning: "warning",
            error: "danger"
        }
        const classes = classNames("hp-dialog-confirm_icon icon iconfont", {
            [`icon-${theme}`]: theme,
            [`${colorEnum[theme]}`]: theme
        })
        render(
            <Dialog
                title={title}
                buttons={{ 确认: true }}
            >
                <div className="p-1rem">
                    <i className={classes}></i>
                    {content}
                </div>
            </Dialog>, modalContainer)
    }
}
Dialog.defaultProps = {
    prefixCls: "hp-dialog"
}