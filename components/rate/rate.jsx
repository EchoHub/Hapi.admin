import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import * as DOM from "dom/dom";
import classNames from "classnames";
import "./rate.scss";
/**
 * @desc 评分
 */
export default class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: props.score,
            staticScore: props.score,
            totalScore: props.total,
            units: props.units
        };
    }
    /** 
     * @desc 分数控制
    */
    scorehandler(event, behavor) {
        const _node = event.target || window.event.target;
        const { colors, readOnly } = this.props;
        if (readOnly) {
            return;
        }
        switch (behavor) {
            case "over":
                for (const key in this.refs) {
                    const _item = this.refs[key];
                    if (_item === _node) {
                        const _index = +key.replace(/hp-rateicon-/, "") + 1;
                        this.setState({
                            score: _index,
                            color: colors[_index < 3 ? 0 : _index === 3 ? 1 : 2] || colors[colors.length - 1]
                        });
                    }
                }
                break;
            case "leave":
                const { staticScore } = this.state
                this.setState({
                    score: staticScore,
                    color: staticScore ?
                        (colors[staticScore < 3 ? 0 : staticScore === 3 ? 1 : 2] || colors[colors.length - 1]) :
                        null
                });
                break;
        }
    }
    componentDidMount() {
        this.setState({
            score: this.props.value
        });

        DOM.on(findDOMNode(this), "mouseover", event => { this.scorehandler(event, "over") })
        DOM.on(findDOMNode(this), "mouseleave", event => { this.scorehandler(event, "leave") })
    }
    render() {
        const { prefixCls, className, icons, texts, units, readOnly, showText, value, colors } = this.props
        const { score, totalScore, color } = this.state
        const classes = classNames(prefixCls, className)

        const defaultClassName = icons && icons.length ? icons[0] : "icon-like";
        const activeClassName = icons && icons.length ? icons[1] : "icon-like_fill";
        const _texts = texts instanceof Array ? (texts || units) : units;
        return <div className={classes}>
            {
                units.map((d, i) =>
                    <i
                        ref={`hp-rateicon-${i}`}
                        key={i}
                        className={`mr-4 icon iconfont hp-rateicon ${score > i ? `active ${activeClassName}` : defaultClassName}`}
                        style={
                            colors && colors.length && score > i ?
                                {
                                    color: color
                                } : null
                        }
                        onClick={() => {
                            // 点击选择分数
                            this.setState({
                                staticScore: i + 1
                            });
                            
                        }}
                    ></i>
                )
            }
            {
                (readOnly || showText) ? <div className="hp-rate-text">{
                    readOnly ?
                        value :
                        _texts[Math.floor(score - 1)] || (score < 2 ? _texts[0] : _texts[_texts.length - 1])
                }</div> : null
            }
        </div>
    }

    get value() {
        return this.state.staticScore
    }

    set value(v) {
        this.setState({
            score: v
        });
    }
}
/**
 * @param className 类名
 * @param score 分数
 * @param staticScore 选中的分数
 * @param totalScore 总分
 * @param colors 区分评分颜色 最多支持三种
 * @param showText 是否显示辅助文字
 * @param units 每个分数段对应的文字集合
 * @param readOnly 只读
 */
Rate.defaultProps = {
    prefixCls: "hp-rate",
    score: 0,
    staticScore: 0,
    totalScore: 5,
    colors: [],
    showText: false,
    units: ["极差", "失望", "一般", "满意", "惊喜"],
    readOnly: false
}