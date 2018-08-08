import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./navMenu.scss"

export default class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.state = {
            itemactive: false
        }
    }

    /**
     * @desc 渲染 菜单项
     */
    renderMenuItem(menus, theme) {
        if (!menus || !menus.length) return null;
        let result = [], index = 0;
        for (const menu of menus) {
            result.push(<MenuItem
                key={index}
                menu={menu}
                theme={theme}
                parent={this}
            ></MenuItem>)
            index++;
        }
        return result;
    }

    render() {
        const props = this.props;
        const theme = props.theme;
        const menus = props.menus;
        return <ul className={`hp-navmenu ${theme} active`}>
            {
                this.renderMenuItem(menus, theme)
            }
        </ul>
    }
}

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this)
        this.toogleSubMenu = this.toogleSubMenu.bind(this)
        this.activeMenuItem = this.activeMenuItem.bind(this)
        this.state = {
            toggle: false,
            itemactive: false
        }
    }

    /**
     * @desc 激活当前menuItem
     */
    activeMenuItem(e) {
        e.target.parentNode.parentNode.classList.add("active");
    }

    toogleSubMenu() {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    renderItem(menu) {
        const flag = menu.flag;
        const toggle = this.state.toggle;
        let result;
        if (flag === 0) {
            result = <a
                onClick={e => this.activeMenuItem(e)}
                href={menu.route || "javascript:;"}
            >
                <span
                    className="hp-menuitem_title"
                >
                    <span
                        className={`iconfont${menu.icon ? " " + menu.icon : ""}`}
                    >
                    </span>
                    {menu.title}
                </span>
            </a>
        } else {
            const children = menu.children && menu.children.length ? <ul className="hp-menu-sub">
                {menu.children.map((d, i) => <li key={i}>{this.renderItem(d)}</li>)}
            </ul> : null
            result = <div>
                <span
                    className="hp-menuitem_title" href={"javascript:;"}
                    onClick={this.toogleSubMenu}
                >
                    <span className={`iconfont${menu.icon ? " " + menu.icon : ""}`}></span>
                    {menu.title}
                    <span className={`menu-arrow iconfont icon icon-unfold${toggle ? " up" : ""}`}></span>
                </span>
                {children}
            </div>
        }
        return result;
    }

    render() {
        const theme = this.props.theme;
        const menu = this.props.menu;
        const toggle = this.state.toggle;
        return <li
            className={`hp-menuitem ${theme}${toggle ? " active" : ""}`}
        >
            {
                this.renderItem(menu)
            }
        </li>
    }
}
NavMenu.defaultProps = {
    theme: "primary"
}
MenuItem.defaultProps = {
    theme: "primary"
}