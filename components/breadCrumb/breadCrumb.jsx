import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./breadCrumb.scss"

export default class BreadCrumb extends Component {
    render() {
        const info = this.props.info;
        console.log(info)
        return <div className="hp-breadcrumb">
        <span className="hp-breadcrumb_first">{info.first}</span>
        <span className="hp-breadcrumb_separator">/</span>
        <i className="iconfont icon-homepage_fill"></i>
        <span className="hp-breadcrumb_separator">/</span>
        <span className="hp-breadcrumb_second"><a href="#">{info.second}</a></span>
        <span className="hp-breadcrumb_separator">/</span>
        <span className="hp-breadcrumb_third">{info.third}</span>
        </div>
    }
}