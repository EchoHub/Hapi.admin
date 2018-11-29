import React, { Component } from "react"
import classNames from "classnames"
import "./checkBoxGroup.scss"
import CheckBox from "../checkBox/checkBox";
/**
 * @desc 表示一个多选框
 */
export default class CheckBoxGroup extends Component {
    constructor(props) {
        super(props)
    }

    get value() {
        let result = []
        const refs = this.refs;
        for (const key in refs) {
            key.indexOf("checkBox_") > -1 && refs[key].value !== null && result.push(refs[key].value)
        }
        return result
    }

    set value(value) {
        if (typeof value === "string") value = [].push(value);
        const refs = this.refs;
        for (const key in refs) {
            for (const _value of value) {
                if (key.indexOf("checkBox_") > -1) {
                    const isChecked = refs[key].props.value === _value;
                    if(isChecked) {
                        refs[key].checked = isChecked
                        break;
                    }
                    refs[key].checked = isChecked
                }
            }
        }
    }

    render() {
        const { prefixCls, className, children } = this.props;
        const classes = classNames(prefixCls, className);
        return <div ref="checkBoxGroup" className={classes}>
            {
                children.map((child, index) => {
                    if (child.type instanceof Function) {
                        return <CheckBox key={`checkBox_${index}`} ref={`checkBox_${index}`} {...child.props}></CheckBox>
                    }
                    return child
                })
            }
        </div>
    }
}
CheckBoxGroup.defaultProps = {
    prefixCls: "hp-checkboxgroup"
}