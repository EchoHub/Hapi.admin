import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import * as DOM from "dom/dom";
import classNames from "classnames";
import "./carousel.scss"

export default class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            childNodes: []
        }
    }
    componentDidMount() {
        const carouselListNode = this.carouselListNode
        const children = carouselListNode.childNodes;
        const childrenArr = Array.from(children);
        let childNodes = []
        for (const child of childrenArr) {
            childNodes.push({
                width: child.offsetWidth,
                height: child.offsetHeight,
            })
        }
        const { activeIndex, vertical, autoPlay, duration, effect } = this.props;
        this.setState({
            childNodes: childNodes,
            _activeIndex: activeIndex
        })
        if (activeIndex || effect === "fade") {
            this.effect(childNodes, activeIndex, vertical, effect)
        }
        if (autoPlay) {
            const len = childNodes.length;
            let activeIndex_ = activeIndex;
            setInterval(() => {
                this.effect(childNodes, activeIndex_, vertical, effect)
                this.setState({
                    _activeIndex: activeIndex_
                })
                if (activeIndex_ == len - 1) {
                    activeIndex_ = 0;
                } else {
                    activeIndex_++;
                }
            }, duration);
        }
    }
    render() {
        const { prefixCls, className, children, vertical, effect } = this.props;
        const { _activeIndex } = this.state;
        const classes = classNames(prefixCls, className, {
            [`vertical`]: vertical,
            [`${effect}`]: effect,
        })
        return <div className={classes}>
            <div ref={node => this.carouselListNode = node} className="hp-carousel-list">{children}</div>
            <ul className="hp-carousel-dots">
                {
                    children.map((child, index) => <li
                        key={index}
                        className={index === _activeIndex ? "hp-carousel-dot active" : "hp-carousel-dot"}
                        onClick={this.changeItemByDot.bind(this, index)}
                    ></li>)
                }
            </ul>
        </div>
    }

    effect(childNodes, activeIndex, vertical, effect) {
        const carouselListNode = this.carouselListNode
        if(!carouselListNode) return
        switch (effect) {
            case "offset":
            default:
                const offset = this.caculateOffset(childNodes, activeIndex, vertical);
                if (vertical) {
                    carouselListNode.style.top = offset;
                } else {
                    carouselListNode.style.left = offset;
                }
                break;
            case "fade":
                let index = 0;
                const _selfNode = findDOMNode(this);
                _selfNode.style.opacity= .8;
                const timer = setTimeout(() => {
                    _selfNode.style.opacity= 1;
                    _selfNode.style = null;
                    clearTimeout(timer)
                }, 100)
                for (const child of carouselListNode.childNodes) {
                    if (index === activeIndex) {
                        DOM.addClass(child, "active")
                    } else {
                        DOM.removeClass(child, "active")
                    }
                    index++;
                }
                break;
        }
    }

    caculateOffset(arr, index, isVertical) {
        let i = 0, total = 0;
        while (i < index) {
            total += isVertical ? arr[i].height : arr[i].width
            i++;
        }
        return -total + "px";
    }

    changeItemByDot(index) {
        const { childNodes } = this.state;
        const { vertical, effect } = this.props;
        this.effect(childNodes, index, vertical, effect)
        this.setState({
            _activeIndex: index
        })
    }
}
Carousel.propTypes = {
    prefixCls: PropTypes.string
}
Carousel.defaultProps = {
    prefixCls: "hp-carousel",
    activeIndex: 0, // 默认展示
    vertical: false, // 是否垂直展示
    autoPlay: false, // 是否自动播放
    effect: "offset", // 切换效果 offset 偏移 fade 渐显
    duration: 2000 // 定时时间
}