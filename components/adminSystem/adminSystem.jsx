import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavMenu from "navMenu/navMenu";
import { HashRouter as Router, Route } from "react-router-dom"
import { TextBox, Pages } from "common"
import "./adminSystem.scss"

export default class AdminSystem extends Component {
    constructor(props) {
        super(props);
        this.setCollapsed = this.setCollapsed.bind(this);
        this.createRoute = this.createRoute.bind(this);
        this.state = {
            collapsed: false
        }
    }

    setCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    createRoute(menus) {
        let result = [], index = 0;
        if (!menus || !menus.length) return null;
        for (const menu of menus) {
            if (menu.flag === 1 && menu.children && menu.children.length) {
                const _result = this.createRoute(menu.children);
                result = result.concat(_result);
            } else if (menu.flag === 0) {
                const route = menu.route.indexOf("/") > -1 ? menu.route.split("/")[1] : menu.route;
                if (Pages[route]) {
                    result.push(<Route key={menu.route + index} path={menu.route} component={Pages[route]}></Route>);
                }
            }
            index++;
        }
        return result;
    }

    render() {
        const theme = this.props.theme;
        const menus = this.props.menus;
        const collapsed = this.state.collapsed;
        return <div className="hp-adminsystem">
            <AdminSystem_Header
                theme={theme}
                collapsed={collapsed}
                setCollapsed={this.setCollapsed}
            ></AdminSystem_Header>
            <Router>
                <div>
                    <NavMenu
                        theme={theme}
                        menus={menus}
                        collapsed={collapsed}
                    ></NavMenu>
                    <div className="hp-container">
                        <TopBar></TopBar>
                        {this.createRoute(menus)}
                    </div>
                </div>
            </Router>
        </div>
    }
}
export class AdminSystem_Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNavBar = this.toggleNavBar.bind(this);
    }

    /**
     * @desc 展开／收缩 导航
     */
    toggleNavBar() {
        this.props.setCollapsed(!this.props.collapsed)
    }

    /**
     * @desc 重新加载页面
     */
    reloadScreen() {
        location.reload();
    }

    /**
     * @desc 全屏
     */
    fullScreen() {
        fullScreen(document.documentElement)
    }

    render() {
        const theme = this.props.theme;
        return <header className={`hp-adminsystem_header bg-${theme}`}>
            <div className={`hp-adminsystem_header_left${this.props.collapsed ? " collapsed" : ""}`}>
                <a href="javascript:;">
                    <span className="logo">
                        <img src={this.props.logo} />
                        <b>HaPi</b> Admin</span>
                </a>
                <span className="toggle_navmenu iconfont icon-manage_fill" onClick={this.toggleNavBar}></span>
            </div>
            <div className="hp-adminsystem_header_right">
                <span className="hp-adminsystem_header_flag iconfont icon-refresh" onClick={this.reloadScreen}></span>
                <span className="hp-adminsystem_header_flag iconfont icon-fullscreen" onClick={this.fullScreen}></span>
                <SearchBar theme={theme}></SearchBar>
                <ul className="hp-adminsystem_header_right_navbar">
                    <li>
                        <span className="hp-adminsystem_header_flag iconfont icon-remind"></span>
                    </li>
                    <li>
                        <span className="hp-adminsystem_header_flag iconfont icon-share"></span>
                    </li>
                    <li>
                        <span className="hp-adminsystem_header_flag iconfont icon-setup"></span>
                    </li>
                    <li>
                        <span className="hp-adminsystem_header_flag iconfont icon-mine"></span>
                    </li>
                </ul>
            </div>
        </header>
    }
}

export class TopBar extends Component {
    render() {
        return <div className="hp-topbar">
            1
        </div>
    }
}
AdminSystem.defaultProps = {
    // primary -> 默认， system -> 专业， grey -> 商务，dark -> 深蓝 
    theme: "primary"
}
AdminSystem_Header.defaultProps = {
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApsAAAKbCAYAAAC6kkFkAAAACXBIWXMAAAsTAAALEwEAmpwYAABDJWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTgtMDctMjNUMDk6NDc6MjUrMDE6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE4LTA4LTA3VDE3OjQzOjM0KzA4OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0wOC0wN1QxNzo0MzozNCswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6NjVlNWU0N2QtNDRmNS00ZGE4LTk0MzgtMTljZmJjYzVkNmQ5PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6NDQ4YzA5NDYtYzk0OS1mNjRhLTk5ZmUtMjY2OTVkY2JmMjgwPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6ZTNmNjZjZDgtZGQyMS00M2JmLWE0MjAtMWY3MDBjMjM1MDcxPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmUzZjY2Y2Q4LWRkMjEtNDNiZi1hNDIwLTFmNzAwYzIzNTA3MTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0wNy0yM1QwOTo0NzoyNSswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjQ2N2NmYTNhLWFiNTgtNGNkMy04YjJjLTcxNGQ2NGU0ZjIzYTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0wNy0yM1QwOTo1MTowMiswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjNmZTIzZDA0LTgxN2ItNDk0Zi1hOGEzLWIzZmE3MmY2YzlmMzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0wNy0yM1QxNzoxMzowOCswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjllZTc1NTc4LWQyMDgtNDQwYy1hMzAwLWM5OTQ2OWU2OTRiNjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0wNy0yM1QxNzoxMzowOCswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjY1ZTVlNDdkLTQ0ZjUtNGRhOC05NDM4LTE5Y2ZiY2M1ZDZkOTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0wOC0wN1QxNzo0MzozNCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDozZmUyM2QwNC04MTdiLTQ5NGYtYThhMy1iM2ZhNzJmNmM5ZjM8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDplZWZkNTM5Zi04NTNlLWZlNGYtYTUwZS1iNzI2MzMzMDFjYTE8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplM2Y2NmNkOC1kZDIxLTQzYmYtYTQyMC0xZjcwMGMyMzUwNzE8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjY2NzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj42Njc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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"
}

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }

        this.toggleSreach = this.toggleSreach.bind(this)
    }
    toggleSreach() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        const theme = this.props.theme;
        const collapsed = this.state.collapsed;
        return <div
            className={`hp-searchbar ${theme}${collapsed ? "" : " active"}`}
            onClick={this.toggleSreach}
        >
            <span className="iconfont icon-search"></span>
            <TextBox></TextBox>
        </div>
    }
}

function fullScreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
}