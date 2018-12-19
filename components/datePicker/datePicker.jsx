import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from "react-dom";
import { clean } from "common";
import classNames from "classnames";
const laydate = require("libs/laydate/laydate.js");
import "./datePicker.scss"
import "libs/laydate/theme/default/laydate.scss"
import "textBox/textBox.scss"

export default class DatePicker extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { format, range, pickerType, min, max, start, event } = this.props;
        laydate.render(clean({
            elem: findDOMNode(this),
            format: format || "yyyy-MM-dd",
            type: pickerType || (
                !format ? "date" :
                    /^\d{4}$/.test(format) ? "year" :
                        /^\d{4}\D\d+$/.test(format) ? "month" :
                            /^\d{4}\D\d+\D\d+$/.test(format) ? "date" :
                                /^\d+:\d+\d+:$/.test(format) ? "time" : "datetime"),
            range: range,
            min: min,
            max: max,
            trigger: event,
            // calendar: calendar,
            // mark: mark,
            value: start,
            done: () => {
            },
            theme: "#1890ff"
        }));
    // dom.on(this.elem, "click", e => e.stopPropagation());
    // dom.on(this.elem, "change", e => {
    //     this.onChange && this.onChange(this);
    // })
    }
    render() {
        const { prefixCls, className } = this.props;
        const classes = classNames(prefixCls, className);
        return <input type="text" className={classes}/>
    }
}

DatePicker.defaultProps = {
    prefixCls: "hp-datepicker hp-textbox",
    format: "yyyy-MM-dd",
    pickerType: "datetime", // "year" | "month" | "date" | "time" | "datetime"
    range: false, // 是否选择时间区域
    event: "click",
    min: null,
    max: null,
    start: null
}

// {
//     elem: '#id', //需显示日期的元素选择器
//     event: 'click', //触发事件
//     format: 'YYYY-MM-DD hh:mm:ss', //日期格式
//     istime: false, //是否开启时间选择
//     isclear: true, //是否显示清空
//     istoday: true, //是否显示今天
//     issure: true, 是否显示确认
//     festival: true //是否显示节日
//     min: '1900-01-01 00:00:00', //最小日期
//     max: '2099-12-31 23:59:59', //最大日期
//     start: '2014-6-15 23:00:00',  //开始日期
//     fixed: false, //是否固定在可视区域
//     zIndex: 99999999, //css z-index
//     choose: function(dates){ //选择好日期的回调
   
//     }
//   }