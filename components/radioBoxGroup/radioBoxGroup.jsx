import React, { Component } from "react"
import RadioBox from "radioBox/radioBox"
import classNames from "classnames"
import "./radioBoxGroup.scss"
/**
 * @desc 表示一个单选框组
 */
export default class RadioBoxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentNodeNumber: -1
        }
    }

    get value() {
        let result = ""
        const refs = this.refs;
        for (const key in refs) {
            key.indexOf("radioBox_") > -1 && refs[key].value !== null && (result = refs[key].value)
        }
        return result;
    }

    set value(value) {
        const refs = this.refs;
        for (const key in refs) {
            if (key.indexOf("radioBox_") > -1) {
                const isChecked = refs[key].props.value === value;
                if (isChecked) {
                    refs[key].checked = isChecked
                    break;
                }
                refs[key].checked = isChecked
            }
        }
    }


    render() {
        const { prefixCls, className, children } = this.props;
        const classes = classNames(prefixCls, className);
        return <div ref="radioBoxGroup" className={classes}>
            {
                children.map((child, index) => {
                    if (child.type instanceof Function) {
                        return <RadioBox key={`radioBox_${index}`} ref={`radioBox_${index}`} refs={this.refs} {...child.props}></RadioBox>
                    }
                    return child
                })
            }
        </div>
    }

}
RadioBoxGroup.defaultProps = {
    prefixCls: "hp-radioboxgroup",
}