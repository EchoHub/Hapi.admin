import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { typeToString } from "utils/utils";
import "./form.scss"

export default class Form extends Component {
    constructor(props) {
        super(props);
    }

    get value() {
        let _value = {}
        const refs = this.refs;
        for(const key in refs) {
            _value = Object.assign(_value,refs[key].value);
        }
        return _value;
    }

    set value(v) {
        const refs = this.refs;
        for(const key in refs) {
            refs[key].value = v;
        }
    }

    reportValidity() {
        let report = []
        const refs = this.refs;
        for(const key in refs) {
            report.push(refs[key].reportValidity());
        }
        console.log("form ", report)
        return report;
    }

    render() {
        const { children, className, prefixCls } = this.props;
        const classes = classNames(prefixCls, className);
        return <form className={classes}>{renderChildren(children)}</form>
    }
}
Form.propTypes = {
    prefixCls: PropTypes.string
}
Form.defaultProps = {
    prefixCls: "hp-form"
}
export class FormLayout extends Component {
    constructor(props) {
        super(props);
    }

    static splitChildren(children) {
        let result = [], tds = [], index = 0;
        typeToString(children) !== "[object Array]" && (children = [children]);
        for (const child of renderChildren(children)) {
            if (child.type instanceof Function) {
                tds.push(child)
            } else {
                tds = [];
                index++;
                continue;
            }
            result[index] = tds;
        }
        return result;
    }

    get value() {
        let _value = {}
        const refs = this.refs;
        for(const key in refs) {
            _value = Object.assign(_value,refs[key].value);
        }
        return _value;
    }

    set value(v) {
        const refs = this.refs;
        for(const key in refs) {
            refs[key].value = v;
        }
    }

    reportValidity() {
        let report = []
        const refs = this.refs;
        for(const key in refs) {
            report.push(refs[key].reportValidity());
        }
        console.log("formlayout ", report)
        return report;
    }

    render() {
        const { children, prefixCls, className, style } = this.props
        const classes = classNames(prefixCls, className)
        return <table className={classes} style={style}>
            <tbody>
                {FormLayout.splitChildren(children).map((child, index) => {
                    return <tr key={`tr_${index}`}>{child}</tr>;
                })}
            </tbody>
        </table>
    }
}
FormLayout.propTypes = {
    prefixCls: PropTypes.string
}
FormLayout.defaultProps = {
    prefixCls: "hp-formlayout"
}
export class FormField extends Component {
    constructor(props) {
        super(props);
    }

    get value() {
        let _value = {}
        const refs = this.refs;
        for(const key in refs) {
            _value = Object.assign(_value, refs[key].value);
        }

        return _value;
    }

    set value(v) {
        const refs = this.refs;
        for(const key in refs) {
            refs[key].value = v;
        }
    }

    reportValidity() {
        let report = []
        const refs = this.refs;
        for(const key in refs) {
            report.push(refs[key].reportValidity());
        }
        console.log("formfield ", report)
        return report;
    }

    render() {
        const { children, className, prefixCls, label, colSpan } = this.props;
        const classes = classNames(prefixCls, className);
        return [
            <th
                className={classes}
                key={"x-formfield_label-1"}
            >
                <label className="x-formfield_label">{label}</label>
            </th>,
            <td
                className={classes} key={"x-formfield_label-2"}
                colSpan={colSpan % 2 === 0 ? colSpan + 1 : colSpan}
            >{renderChildren(children)}</td>
        ]
    }
}
FormField.propTypes = {
    prefixCls: PropTypes.string
}
FormField.defaultProps = {
    prefixCls: "hp-formfield",
    colSpan: 1
}

function renderChildren(children) {
    let _children = [], index = 0;
    for (const item of (typeToString(children) === "[object Array]" ? children : [children])) {
        let _item = item;
        if(item.type instanceof Function) {
            switch (item.type.name.toUpperCase()) {
                case "FORMLAYOUT":
                    const { props } = item;
                    const tag = `formlayout-${index}`;
                    _item = <FormLayout
                        key={tag}
                        ref={tag}
                        {...props}
                    >
                    </FormLayout>
                    break;
                case "FORMFIELD":
                    const props1 = item.props;
                    const tag1 = `formfield-${index}`;
                    _item = <FormField
                        key={tag1}
                        ref={tag1}
                        {...props1}
                    >
                    </FormField>
                    break;
                default:
                    const props2 = item.props;
                    const tag2 = `${item.type.name}-${index}`;
                    _item = <item.type
                        key={tag2}
                        ref={tag2}
                        {...props2}
                    ></item.type>
                    break;
            }
        }
        _children.push(_item);
        index++;
    }
    return _children;
}