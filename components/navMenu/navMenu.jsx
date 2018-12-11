import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./navMenu.scss"

export default class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);
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
                itemactive={this.state.itemactive}
                parent={this}
                setCurTopBarInfo={this.props.setCurTopBarInfo || (() => {})}
                theme={theme}
            ></MenuItem>)
            index++;
        }
        return result;
    }

    setActiveItem(node) {
        const nodes = this.refs.navmenu.querySelectorAll(".hp-menuitem_title");
        for (let i = 0; i < nodes.length; i++) {
            const li = nodes[i].parentNode.parentNode;
            if (nodes[i] !== node) {
                if (li.childNodes[0].nodeName === "A") {
                    li.className = li.className.replace(/hp_item_selected/, "");
                    if(li.classList.length === 0) li.removeAttribute("class")
                }
            } else {
                li.classList.add("hp_item_selected")
            }
        }
    }

    render() {
        const props = this.props;
        const theme = props.theme;
        const menus = props.menus;
        const collapsed = this.props.collapsed;
        return <ul ref="navmenu" className={`hp-navmenu ${theme} active${collapsed ? " collapsed" : ""}`}>
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
            itemactive: props.itemactive || false,
            initial: true
        }
    }

    /**
     * @desc 激活当前menuItem
     */
    activeMenuItem(e, menu) {
        // e.target.parentNode.parentNode.classList.add("active");
        const parent = this.props.parent;
        this.props.setCurTopBarInfo(menu)
        parent.setActiveItem(e.target || window.event.target);
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
            if (menu.active && this.state.initial) {
                const timer = setTimeout(() => {
                    this.setState({
                        toggle: true,
                        itemactive: true,
                        initial: false
                    })
                    clearTimeout(timer);
                }, 10);
            }
            result =
                <Link to={`${menu.route}?${btoa(new Date().getTime())}`} onClick={e => this.activeMenuItem(e, menu)}>
                    <span
                        className="hp-menuitem_title"
                    >
                        <span
                            className={`iconfont${menu.icon ? " " + menu.icon : ""}`}
                        >
                        </span>
                        {menu.title}
                    </span>
                </Link>
        } else {
            const children = menu.children && menu.children.length ? <ul className="hp-menu-sub">
                {menu.children.map((d, i) => <li className={d.active ? "hp_item_selected" : ""} key={i}>{this.renderItem(d)}</li>)}
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
        const active = menu.active
        const toggle = this.state.toggle;
        return <li
            className={`hp-menuitem ${theme}${toggle ? " active" : ""}${active ? " hp_item_selected" : ""}`}
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