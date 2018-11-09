import React, { Component } from 'react';
import * as ReactDOM from "react-dom"
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./panel.scss"

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.fullScreenHandle = this.fullScreenHandle.bind(this);
        this.minHandle = this.minHandle.bind(this);
        this.closeHandle = this.closeHandle.bind(this);
        this.state = {
            fullScreen: false,
            min: false
        }
    }

    /**
     * @desc 全屏
     */
    fullScreenHandle() {
        this.setState({
            fullScreen: !this.state.fullScreen
        })
    }

    /**
     * @desc 最小化
     */
    minHandle() {
        this.setState({
            min: !this.state.min
        })
    }

    /**
     * @desc 关闭
     */
    closeHandle() {
        this.refs.panel.parentNode.removeChild(this.refs.panel)
    }
    render() {
        const { title, toolbar, prefixCls, className, children } = this.props;
        const { fullScreen, min } = this.state;
        const classes = classNames(prefixCls, className, fullScreen ? "full" : "");
        return <div ref="panel" className={classes}>
            <div className="hp-panel_title">
                {title}
                {toolbar ? <ul className="hp-panel_toolbar">
                    <li><span className="iconfont icon-refresh"></span></li>
                    <li><span className={`iconfont ${fullScreen ? "icon-narrow" : "icon-fullscreen"}`} onClick={this.fullScreenHandle}></span></li>
                    <li><span className="iconfont" onClick={this.minHandle}>{min ? "+" : "-"}</span></li>
                    <li><span className="iconfont" onClick={this.closeHandle}>×</span></li>
                </ul> : null}
            </div>
            <div className={`hp-panel_content${min ? " min" : ""}`}>{children}</div>
        </div>
    }
}
Panel.propTypes = {
    prefixCls: PropTypes.string
}
Panel.defaultProps = {
    prefixCls: "hp-panel"
}