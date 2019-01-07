import React, { Component } from "react";
import { render, findDOMNode } from "react-dom";
import * as DOM from "dom/dom";
import classNames from "classnames";
import "./dropDown.scss";
/**
 * @desc 下拉菜单
 */
export default class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedKey: "",
            selectedName: ""
        };
        // 事件触发频率控制
        this.eventActive = true
    }
    /**
     * @desc 设置选中项
     */
    setSelectedItemHandler(key, name) {
        this.setState({
            selectedKey: key,
            selectedName: name
        });
    }
    /**
     * @desc 展开/收起菜单
     */
    toggleMenu(value) {
        const _self_ul = DOM.find(findDOMNode(this), ".hp-dropdown-list");
        DOM.addClass(_self_ul, "collapsing");
        if (value) {
            const timer1 = setTimeout(() => {
                DOM.addClass(_self_ul, "active");
                DOM.removeClass(_self_ul, "collapsing");
                clearTimeout(timer1)
            }, 10);
        } else {
            DOM.removeClass(_self_ul, "active");
            const timer2 = setTimeout(() => {
                DOM.removeClass(_self_ul, "collapsing");
                clearTimeout(timer2)
            }, 300);
        }
    }
    render() {
        const { prefixCls, className, menu, type, children } = this.props;
        let newArr = []
        let i = 1;
        if (menu.length) {
            for (const _ of menu) {
                if (_.item) {
                    // 一级下拉 优先
                    const item = _.item;
                    newArr.push(<DropDownItem
                        key={i}
                        value={item.key}
                        name={item.name}
                        disabled={item.disabled || false}
                        onClick={item.onClick}
                        setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                    ></DropDownItem>)
                } else if (_.subMenu) {
                    const subMenu = _.subMenu
                    // 二级下拉
                    newArr.push(<SubMenu
                        key={i}
                        name={subMenu.name}
                        menu={subMenu.menu}
                        setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                    ></SubMenu>)
                }
                i++;
            }
        }
        const classes = classNames(prefixCls, className)
        return <div
            className={classes}
            onMouseEnter={() => { type === "hover" && this.toggleMenu(true) }}
            onMouseLeave={() => { this.toggleMenu(false) }}
            onClick={() => { type === "click" && this.toggleMenu(true) }}
        >
            <a
                className="hp-dropdown-link"
                href="javascript:;"
            >
                {children}
                <i className="icon iconfont icon-arrow icon-unfold"></i>
            </a>
            <ul className="hp-dropdown-list">
                {newArr}
            </ul>
        </div>
    }
}
/**
 * @param menu 下拉菜单项
 *          -- item
 *             -- key
 *             -- name
 *             -- disabled
 *          --subMenu
 *             -- name
 *             -- menu
 *             -- disabled
 * @param type 触发下拉类型 hover／click
 */
DropDown.defaultProps = {
    prefixCls: "hp-dropdown",
    menu: [],
    type: "hover"
}

export class DropDownItem extends Component {
    constructor(props) {
        super(props)
    }
    selectHandler() {
        const { setSelectedItemHandler, name, value, onClick } = this.props;
        setSelectedItemHandler(value, name);
        const item = {
            name: name,
            value: value
        }
        onClick && onClick instanceof Function && onClick(item)
    }
    render() {
        const { disabled, name } = this.props;
        const classes = classNames("hp-dropdown-item", {
            ["disabled"]: disabled
        })
        return <li
            className={classes}
            onClick={() => { !disabled && this.selectHandler() }}
        ><span className="hp-dropdown-item-title">{name}</span></li>
    }
}

export class SubMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
    }
    /**
     * 
     * @param {*} type 0 移出 1 进入
     * @param {*} value 
     */
    toggleMenu(type, value) {
        !this.props.disabled && this.setState({
            show: value
        });
    }
    componentDidUpdate() {
        const _self = findDOMNode(this);
        const dropDownNode = DOM.closest(_self, ".hp-dropdown-item");
        const ulNode = DOM.find(_self, ".hp-dropdown-submenu-ul");
        if (dropDownNode && ulNode) {
            DOM.find(_self, ".hp-dropdown-submenu-ul-container").style.left = `${dropDownNode.offsetWidth}px`;
        }
    }
    setSelectedItemHandler(key, name) {
        this.props.setSelectedItemHandler(key, name);
    }
    render() {
        const { prefixCls, className, menu, disabled, name } = this.props;
        const classes = classNames(prefixCls, className, {
            ["disabled"]: disabled
        })
        return <li
            className={classes}
            onMouseEnter={() => { this.toggleMenu(1, true) }}
            onMouseLeave={() => { this.toggleMenu(0, false) }}
        >
            <span className="hp-dropdown-submenu-title">
                {name}
                <i className="hp-dropdown-submenu-title-icon icon iconfont icon-enter"></i>
            </span>
            <div className="hp-dropdown-submenu-ul-container">
                <ul className="hp-dropdown-submenu-ul e-ml-10" style={{ display: `${this.state.show ? "inherit" : "none"}` }}>
                    {
                        menu.length ? menu.map((d, i) => {
                            if (d.subMenu) {
                                const subMenu = d.subMenu
                                // 二级下拉
                                return <SubMenu
                                    key={i}
                                    name={subMenu.name}
                                    menu={subMenu.menu}
                                    disabled={subMenu.disabled}
                                    setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                                ></SubMenu>;
                            } else {
                                const item = d;
                                return <DropDownItem
                                    key={i}
                                    value={item.key}
                                    name={item.name}
                                    disabled={item.disabled || false}
                                    onClick={item.onClick}
                                    setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                                ></DropDownItem>;
                            }
                        }
                        ) : null
                    }
                </ul>
            </div>
        </li>
    }
}
SubMenu.defaultProps = {
    menu: [],
    prefixCls: "hp-dropdown-submenu",
    parent: null
}