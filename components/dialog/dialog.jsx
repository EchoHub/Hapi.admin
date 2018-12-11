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
        this.state = { duration: 5000 }
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.close = this.close.bind(this)
        this.show = this.show.bind(this)
        this.setIntervalHandle = this.setIntervalHandle.bind(this)
    }
    componentWillReceiveProps(props) {
        const { duration } = props
        this.setState({
            duration: duration
        })
    }
    componentDidMount() {
        const dialog = findDOMNode(this);
        const width = dialog.offsetWidth;
        const height = dialog.offsetHeight;
        dialog.style = `margin-left: -${width / 2}px;margin-top: -${height / 2}px;transform:scale(1)`;

        const { autoClose, duration } = this.props;
        if (autoClose) {
            const timer1 = setTimeout(() => {
                this.close();
                clearTimeout(timer1);
            }, duration)
        }
    }

    // 设置自动关闭定时器
    setIntervalHandle(duration) {
        duration -= 1000;
        const timer = setInterval(() => {
            this.setState({
                duration: duration
            })
            if(duration < 1) {
                clearInterval(timer)
            }
        }, 1000)
    }
    render() {
        const { prefixCls, className, title, children, buttons, autoClose } = this.props
        const { duration } = this.state
        const classes = classNames(prefixCls, className)
        autoClose && this.setIntervalHandle(duration)
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
                                {autoClose && (_buttons.length === 1 || button.type) ? `(${duration/1000}S)` : null}
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

    show(content, title, buttons, onOk, onCancel, options) {
        const modalContainer = document.createElement("div");
        modalContainer.className = "hp-dialog-mask";
        document.body.appendChild(modalContainer);
        render(<Dialog
            title={title}
            buttons={buttons}
            onOk={onOk}
            onCancel={onCancel}
            {...options}
        >{content}</Dialog>, modalContainer)
    }

    static show(content, title, buttons, onOk, onCancel, options) {
        const modalContainer = document.createElement("div");
        modalContainer.className = "hp-dialog-mask";
        document.body.appendChild(modalContainer);
        render(<Dialog
            title={title}
            buttons={buttons}
            onOk={onOk}
            onCancel={onCancel}
            {...options}
        >{content}</Dialog>, modalContainer)
    }

    static confirm(content, title, onOk, onCancel, options) {
        const modalContainer = document.createElement("div");
        modalContainer.className = "hp-dialog-mask";
        document.body.appendChild(modalContainer);
        render(<Dialog
            title={title}
            buttons={{ 确认: true, 取消: false }}
            onOk={onOk}
            onCancel={onCancel}
            {...options}
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
Dialog.propTypes = {
    prefixCls: PropTypes.string,
    autoClose: PropTypes.bool,
    duration: PropTypes.number
}

Dialog.defaultProps = {
    prefixCls: "hp-dialog",
    autoClose: false, // 设置自动关闭窗口
    duration: 5000 // 自动关闭窗口时间（单位:ms）
}