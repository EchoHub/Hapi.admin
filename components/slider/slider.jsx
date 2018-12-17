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
        const { prefixCls, className, size, disabled, showTip, rangeSlider } = this.props;
        const { value } = this.state;
        const classes = classNames(prefixCls, className, {
            [`hp-slider-${size}`]: size,
            [`hp-slider${disabled ? "-disabled" : ""}`]: disabled
        })
        return <div ref="slider" className={classes}>
            {showTip ? <div ref="tip" className="hp-slider-tooltip">{value}</div> : null}
            <div ref="rail" className="hp-slider-rail"></div>
            <div ref="step" className="hp-slider-step"></div>
            {
                rangeSlider ? [
                    <div ref="handle_1"
                        className="hp-slider-handle"
                        key={`sliderhandle-1`}
                        onMouseDown={e => this.sliderStartDrag(e, "handle_1")}
                    ></div>, <div ref="handle_2"
                        className="hp-slider-handle"
                        key={`sliderhandle-2`}
                        onMouseDown={e => this.sliderStartDrag(e, "handle_2")}
                    ></div>
                ] : <div ref="handle"
                    className="hp-slider-handle"
                    onMouseDown={e => this.sliderStartDrag(e, "handle")}
                ></div>
            }

        </div>
    }

    set value(v) {
        const { step, range, rangeSlider } = this.props
        const railEle = this.refs.rail
        const stepEle = this.refs.step
        const tipEl = this.refs.tip
        const width = railEle.offsetWidth;
        let value = rangeSlider && v instanceof Array ? v : [v]
        let index = 1;
        for (const _value of value) {
            const handleEle = value.length > 1 ? this.refs[`handle_${index}`] : this.refs.handle
            const left = Math.round(_value < 0 ? _value : _value > width ? width : _value) / range[1] * width;
            if (left >= 0 && left <= width) {
                handleEle.style = `left: ${left}px`;
                if (!rangeSlider) {
                    stepEle.style = `width: ${left}px`;
                }
                tipEl && (tipEl.style = `left: ${left}px`);
            }
            index++;
        }
        if(rangeSlider) {
            const min = Math.min.apply(Math, v);
            const max = Math.max.apply(Math, v);
            const left = min/range[1] * width
            const max_left = max/range[1] * width
            stepEle.style = `left: ${left}px;width:${max_left - left}px`
        }
        this.setState({
            value: v
        })
    }

    get value() {
        return this.state.value
    }

    sliderStartDrag(e, handleRefName) {
        const { disabled, rangeSlider } = this.props;
        if (disabled) return;
        const slider_left = this.refs.slider.offsetLeft + 230;

        const railEle = this.refs.rail
        const handleEle = this.refs[handleRefName]
        const stepEle = this.refs.step
        const tipEl = this.refs.tip

        const width = railEle.offsetWidth;
        const { step, range } = this.props
        const body = document.body;
        body.onmousemove = e => {
            if (!rangeSlider) {
                const left = e.clientX - slider_left;
                if (left >= 0 && left <= width) {
                    handleEle.style = `left: ${left}px`;
                    stepEle.style = `width: ${left}px`;
                    tipEl && (tipEl.style = `left: ${left}px`);
                }
                this.setState({
                    value: range[0] + Math.round((left > width ? width : (left < 0 ? 0 : left)) / width * range[1])
                })
            } else {
                const left = e.clientX - slider_left;
                const left_1 = this.refs.handle_1.offsetLeft;
                const left_2 = this.refs.handle_2.offsetLeft;
                const _width = left_1 - left_2;
                if (left >= 0 && left <= width) {
                    const step_left = _width > 0 ? left_2 : left_1;
                    handleEle.style = `left: ${left}px`;
                    stepEle.style = `left: ${step_left}px; width: ${Math.abs(_width)}px`;
                    tipEl && (tipEl.style = `left: ${left}px`);
                }
                this.setState({
                    value: _width > 0 ?[
                        range[0] + left_2/width * range[1],
                        range[0] + left_1/width * range[1]
                    ] : [
                        range[0] + left_1/width * range[1],
                        range[0] + left_2/width * range[1]
                    ]
                }, () => {
                    console.log(this.state.value)
                })
            }
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
    rangeSlider: false, // 是否是范围滑块
    range: [0, 100],
    value: 0
}