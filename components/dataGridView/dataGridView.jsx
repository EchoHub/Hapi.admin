import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import * as DOM from "dom/dom";
import { CheckBox, RadioBox, RadioBoxGroup, Pagination } from "common"
import "./dataGridView.scss"

export default class DataGridView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paginationOptions: props.paginationOptions,
            dataSource: props.dataSource || [],
        }
        this.renderBody = this.renderBody.bind(this)
        this.uniqueSelectedRow = this.uniqueSelectedRow.bind(this)
        this.selectedRowsHandle = this.selectedRowsHandle.bind(this)
        this.selectAllRowsHandle = this.selectAllRowsHandle.bind(this)
        this.reload = this.reload.bind(this)
    }
    componentDidMount() {
        const { load, paginationOptions } = this.props;
        load instanceof Function && load(paginationOptions, (data, total) => {
            this.setState({
                dataSource: data,
                total: total
            })
        })
    }

    reload() {
        const { load } = this.props;
        const { paginationOptions } = this.props
        load(paginationOptions, (data, total) => {
            this.setState({
                dataSource: data,
                total: total
            })
        })
    }
    render() {
        const { prefixCls, className, children, multiply, showPagination, load } = this.props
        const { dataSource, total, paginationOptions } = this.state
        const classes = classNames(prefixCls, className);
        return <div className={classes}>
            <table ref="table" className={classes}>
                {this.renderBody(dataSource, children, { multiply })}
            </table>
            {showPagination ? <Pagination
                ref="pagination"
                parent={this}
                load={load}
                {...paginationOptions}
                total={total}
            ></Pagination> : null}
        </div>
    }

    get selectedRow() {
        return this._selectedRow
    }

    set selectedRow(v) {
        this._selectedRow = v
    }

    /** 
     * 过滤选中行
    */
    uniqueSelectedRow(arr, data, isRemove) {
        let result = [];
        for (const item of arr) {
            for (const key in item) {
                if (item[key] !== data[key]) {
                    result.push(item)
                    break;
                }
            }
        }

        // 如果isRemove=false在最后添加当前选中数据
        !isRemove && result.push(data);
        this.selectedRow = result
    }
    /**
     * 多选控制
     * @param {*} hasChecked 
     * @param {*} data 
     */
    selectedRowsHandle(event, data, indicator) {
        const { multiply } = this.props;
        const tr = DOM.closest(event.target, "tr");
        const trs = DOM.query(this.refs.table, "tbody tr");
        if (indicator) {
            if (multiply) {
                const cb = DOM.find(tr, ".hp-checkbox");
                this.uniqueSelectedRow((this._selectedRow || []).concat(data), data, DOM.hasClass(cb, "active"))
                DOM.toggleClass(tr, "selected-tr")
                DOM.toggleClass(cb, "active")
                // 多选过滤
            } else {
                for (const item of trs) {
                    DOM.removeClass(item, "selected-tr")
                    DOM.removeClass(DOM.find(item, ".hp-radiobox"), "active")
                }
                DOM.addClass(tr, "selected-tr");
                DOM.addClass(DOM.find(tr, ".hp-radiobox"), "active")
                this.selectedRow = data
            }
        }
    }

    /**
     * 全选
     */
    selectAllRowsHandle() {
        const cbs = DOM.query(this.refs.table, ".hp-checkbox");
        const checked = this.refs.allcb.checked;
        const { dataSource } = this.props;
        if (checked) {
            cbs.forEach(cb => DOM.addClass(cb, "active"))
            this.selectedRow = dataSource;
        } else {
            cbs.forEach(cb => DOM.removeClass(cb, "active"))
            this.selectedRow = []
        }
    }
    /**
     * 渲染列表
     * @param {*} dataSource 
     * @param {*} children 
     * @param {*} multiply  是否多选
     */
    renderBody(dataSource, _children, options) {
        let ths = [], trs = []
        const { multiply } = options
        for (const item of _children) {
            const { title, indicator } = item.props
            if (indicator) {
                multiply && ths.push(<th key={`all_all`}><CheckBox ref="allcb" onClick={this.selectAllRowsHandle}></CheckBox></th>)
            } else {
                ths.push(<th key={`td_${title}`}>{title}</th>)
            }
        }
        if (dataSource && dataSource.length) {
            let _indicator
            for (const data of dataSource) {
                let tds = []
                for (const item of _children) {
                    const { indicator, children } = item.props;
                    let td = null;
                    if (indicator) { // 是否可选
                        !_indicator && (_indicator = indicator)
                        td = multiply ?
                            <CheckBox></CheckBox> :
                            <RadioBox></RadioBox>
                    } else if (children instanceof Function) {
                        td = children(data)
                    } else {
                        td = item
                    }
                    tds.push(<td key={`td-${Math.random() * Number(new Date())}`}>{td}</td>)
                }
                trs.push(<tr
                    key={`tr-${Math.random() * Number(new Date())}`}
                    onClick={() => { this.selectedRowsHandle(event, data, _indicator) }}
                >{tds}</tr>);
            }
        }
        const thead = <thead key={`thead-${Math.random() * Number(new Date())}`}><tr>{ths}</tr></thead>
        const tbody = <tbody key={`tbody-${Math.random() * Number(new Date())}`}>{dataSource ? trs : <tr><td colSpan={ths.length}>(无数据)</td></tr>}</tbody>
        return [thead, tbody]
    }

}
DataGridView.defaultProps = {
    prefixCls: "hp-datagridview",
    showPagination: false,
    paginationOptions: {
        page: 1,
        size: 10
    },
    dataSource: [],
    total: 0
}
export class Column extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return <td></td>
    }
}
Column.defaultProps = {
    prefixCls: "hp-column"
}