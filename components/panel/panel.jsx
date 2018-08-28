import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./panel.scss"

export default class Panel extends Component {
    render() {
        const props = this.props;
        return <div className={`hp-panel${props.className ? " " + props.className : ""}`}>
            <div className="hp-panel_title">
                {props.title}
                {props.toolbar ? <ul className="hp-panel_toolbar">
                    <li><span className="iconfont icon-refresh"></span></li>
                    <li><span className="iconfont icon-fullscreen"></span></li>
                    <li><span className="iconfont">－</span></li>
                    <li><span className="iconfont">×</span></li>
                </ul> : null}
            </div>
            <div className="hp-panel_content">{props.children}</div>
        </div>
    }
}