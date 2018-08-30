import React, { Component } from 'react';
import * as ReactDOM from "react-dom"
import PropTypes from 'prop-types';
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
        const props = this.props;
        const state = this.state;
        return <div ref="panel" className={`hp-panel${props.className ? " " + props.className : ""}${state.fullScreen ? " full" : ""}`}>
            <div className="hp-panel_title">
                {props.title}
                {props.toolbar ? <ul className="hp-panel_toolbar">
                    <li><span className="iconfont icon-refresh"></span></li>
                    <li><span className={`iconfont ${state.fullScreen ? "icon-narrow" : "icon-fullscreen"}`} onClick={this.fullScreenHandle}></span></li>
                    <li><span className="iconfont" onClick={this.minHandle}>{state.min ? "+" : "-"}</span></li>
                    <li><span className="iconfont" onClick={this.closeHandle}>×</span></li>
                </ul> : null}
            </div>
            <div className={`hp-panel_content${state.min ? " min" : ""}`}>{props.children}</div>
        </div>
    }
}