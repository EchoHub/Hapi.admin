import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as DOM from "dom/dom";
import classNames from "classnames";
import "./slider.scss"

export default class Slider extends Component {
    constructor(props) {
        super(props)
        this.distX = 0
        this.state = { value: 0 }
        this.sliderStartDrag = this.sliderStartDrag.bind(this)
    }
    componentWillReceiveProps(props) {
        const { value } = props;
        this.value = value
    }
    componentDidMount() {
        const { value } = this.props;
        this.value = value;

    }
    render() {
        const { prefixCls, className, size, disabled, showTip } = this.props;
        const { value } = this.state;
        const classes = classNames(prefixCls, className, {
            [`hp-slider-${size}`]: size,
            [`hp-slider${disabled ? "-disabled" : ""}`]: disabled
        })
        return <div ref="slider" className={classes}>
            {showTip ? <div ref="tip" className="hp-slider-tooltip">{value}</div> : null}
            <div ref="rail" className="hp-slider-rail"></div>
            <div ref="step" className="hp-slider-step"></div>
            <div ref="handle" className="hp-slider-handle"
                onMouseDown={e => this.sliderStartDrag(e)}
            ></div>
        </div>
    }

    set value(v) {
        const { step, range } = this.props
        const railEle = this.refs.rail
        const handleEle = this.refs.handle
        const stepEle = this.refs.step
        const tipEl = this.refs.tip
        const width = railEle.offsetWidth;
        console.log(v)
        const left = Math.round(v < 0 ? v : v > width ? width: v)/range[1] * width;
        if (left >= 0 && left <= width) {
            handleEle.style = `left: ${left}px`;
            stepEle.style = `width: ${left}px`;
            tipEl && (tipEl.style = `left: ${left}px`);
        }
        this.setState({
            value: v
        })
    }

    get value() {
        return this._value
    }

    sliderStartDrag(e) {
        const slider_left = this.refs.slider.offsetLeft + 230;

        const railEle = this.refs.rail
        const handleEle = this.refs.handle
        const stepEle = this.refs.step
        const tipEl = this.refs.tip

        const width = railEle.offsetWidth;
        const { step, range } = this.props
        const body = document.body;
        body.onmousemove = e => {
            const left = e.clientX - slider_left;
            if (left >= 0 && left <= width) {
                handleEle.style = `left: ${left}px`;
                stepEle.style = `width: ${left}px`;
                tipEl && (tipEl.style = `left: ${left}px`);
            }
            this.setState({
                value: range[0] + Math.round((left > width ? width : (left < 0 ? 0 : left)) / width * range[1])
            })
        }
        body.onmouseup = e => {
            body.onmousemove = null
            body.onmouseup = null
        }
    }
}
Slider.defaultProps = {
    prefixCls: "hp-slider",
    size: "normal",
    disabled: false,
    range: [0, 100],
    value: 0
}