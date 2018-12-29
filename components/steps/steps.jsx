import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import * as DOM from "dom/dom";
import classNames from "classnames";
import "./steps.scss";

export default class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            space: "",
            len: 0
        }
    }
    componentWillReceiveProps(props) {
        const { space } = props;
        this.setState({
            space: space
        });
    }
    componentDidMount() {
        const len = DOM.query(findDOMNode(this), ".hp-step").length - 1;
        this.setState({
            len: len + 1,
            space: 1 / len.toFixed(2)
        });
    }
    render() {
        let children_ = [];
        const { prefixCls, className, type, active, finishStatus, children } = this.props;
        const { space, len } = this.state
        let index = 1;
        if (children.length) {
            for (const item of children) {
                switch (item.type && item.type.name) {
                    case "Step":
                    children_.push(<Step
                            key={index}
                            {...item.props}
                            space={space}
                            index={index}
                            active={active}
                            parent={this}
                            totalStep={len}
                            islast={index === len ? true : false}
                            finishStatus={finishStatus || false}
                            status={finishStatus ? "finish" : (index < active ? "finish" : active === index ? "processing" : "unfinish")}
                        ></Step>);
                        index++;
                        break;
                    default:
                        break;
                }
            }
        }
        const classes = classNames(prefixCls, className, type)
        return <div className={classes}>
            {children_}
        </div>
    }
}

/**
 * @param className
 * @param active 设置已经完成到第几步
 * @param space
 * @param finishStatus true 表示步骤完成 false步骤未完成
 */
Steps.defaultProps = {
    prefixCls: "hp-steps",
    active: -1,
    finishStatus: false,
    type: "horizontal" // horizontal 水平 vertical 垂直
}

export class Step extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        const { parent, islast, space } = this.props;
        const _self = findDOMNode(this);
        if (!islast && findDOMNode(parent).className.indexOf(" vertical") < 0) {
            if (space < 1) {
                _self.style.flexBasis = space * 100 + "%";
            } else {
                _self.style.width = space + "px";
            }
        }
    }
    componentDidMount() { }
    render() {
        const { prefixCls, className, status, icon, index, active, finishStatus, space, description, title } = this.props;
        const classes = classNames(prefixCls, className, {
            [`hp-step-${status}`]: status
        })
        return <div className={classes}>
            {
                icon ? <span className={classNames("hp-step-icon icon iconfont", icon)}></span> :
                    <span className="hp-step-icon icon iconfont">{status !== "finish" ? status === "error" ? "×": index : "✓"}</span>
            }
            <span className={`hp-step-line  ${status === "processing" ?
                (index + 2 <= active || finishStatus) ?
                    "finish" : "" : ""}`}></span>
            <div className="hp-step-container">
                <span className="hp-step-title" style={{ maxWidth: `${space < 1 ? undefined : space + "px"}` }}>{title}</span>
                {
                    description !== undefined ?
                        <span className="hp-step-description" style={{ maxWidth: `${space < 1 ? undefined : space + "px"}` }}>{description}</span> : null
                }
            </div>
        </div>
    }
}

/**
 * @param className
 * @param title
 * @param icon 自定义icon 目前暂时只支持库里存在的icon className
 * @param islast 是否是最后一个步骤
 * @param description
 * @param status 当前步骤所处状态 0 进行中 1 已完成 2 未完成
 * @param active 当前第几步
 * @param totalStep 一共多少步
 * @param finishStatus 是否已经完成所有步骤
 */
Step.defaultProps = {
    prefixCls: "hp-step",
    icon: "",
    status: "processing", // processing, finish, unfinish
    title: "",
    islast: false,
    description: "",
    active: -1,
    totalStep: -1,
    finishStatus: false
}