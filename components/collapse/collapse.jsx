import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames";
import "./collapse.scss";
/**
 * @desc 表示一个折叠面板
 */
export default class Collapse extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { accordion, children, prefixCls, className, width, style } = this.props;
        let newChildren = [], index = 1;
        for (const item of children) {
            switch (item.type && item.type.name) {
                case "CollapseItem":
                    newChildren.push(<CollapseItem
                        key={index}
                        {...item.props}
                        content={item.children}
                        accordion={accordion}
                        parent={this}
                        ref={`collapseItem-${index}`}
                    ></CollapseItem>);
                    index ++;
                    break;
                default:
                    break;
            }
        }
        const classes = classNames(prefixCls, className)
        return <div
            className={classes}
            style={
                Object.assign(
                    {
                        width: width && typeof width === "number" ? width + "px" : undefined
                    },
                    style
                )
            }
        >
            {newChildren}
        </div >
    }
}
/**
 * @param accordion 手风琴效果
 * @param icon 设置标题图标
 */
Collapse.defaultProps = {
    prefixCls: "hp-collapse"
}

export class CollapseItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }
    toggleHandler() {
        const _parent = this.props.parent;
        const _content = findDOMNode(this.refs.content);
        const { display } = this.state;
        const { accordion } = this.props;
        let height;
        if(accordion) {
            for(const key in _parent.refs) {
                const _it = _parent.refs[key];
                if(_it !== this) { 
                    const _it_content = findDOMNode(_it.refs.content);
                    _it_content.style.display = "none";
                    _it_content.style.height = null;
                    _it_content.style.padding = "10px 8px";
                    _it.setState({
                        display: false
                    });
                 }
            }
        }
        if (!display) {
            this.setState({
                display: !display
            });
            _content.style.display = "block";
            height = _content.offsetHeight - 20;
            _content.style.height = 0;
            setTimeout(() => {
                _content.style.height = height + "px";
                setTimeout(() => {
                    _content.style.height = null;
                }, 300);
            }, 10);
        } else {
            height = _content.offsetHeight - 20;
            _content.style.height = height + "px";
            setTimeout(() => {
                _content.style.height = 0;
                _content.style.padding = "0 8px";
                setTimeout(() => {
                    _content.style.display = "none";
                    _content.style.height = null;
                    _content.style.padding = "10px 8px";
                    this.setState(preState => {
                        return {
                            display: !preState.display
                        }
                    });
                }, 300);
            }, 10);
        }
    }
    render() {
        const { icon, title, content, children } = this.props;
        const { display } = this.state;
        return <div className="hp-collapse_item">
            <div
                ref="head"
                className={`hp-collapse_item_head ${display ? "active" : ""}`}
                onClick={
                    () => {
                        this.toggleHandler()
                    }
                }
            >
                {
                    icon ? <i className={`title-icon icon iconfont ${icon} mr-10`}></i> : null
                }
                {title || "面板"}
                <i className="icon iconfont arrow icon-enter"></i>
            </div>
            <div
                ref="content"
                className="hp-collapse_item_content"
            >
                {content || children}
            </div>
        </div>
    }
}