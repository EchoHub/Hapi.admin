import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames"
import { checkBox, radioBox, Pagination } from "common"
import "./dataGridView.scss"

export default class DataGridView extends Component {
    constructor(props) {
        super(props)
        this.renderBody = this.renderBody.bind(this)
    }
    render() {
        const { prefixCls, className, dataSource, children, multiply, showPagination, paginationOptions } = this.props
        const classes = classNames(prefixCls, className);
        return <div className={classes}>
            <table className={classes}>
                {this.renderBody(dataSource, children, { multiply })}
            </table>
            { showPagination ? <Pagination load={this.load} {...paginationOptions}></Pagination> : null}
        </div>
    }

    /**
     * 加载信息
     * @param {*} page 
     * @param {*} pageSize 
     */
    load(page, pageSize) {
        console.log(page, pageSize)
    }

    set selectedRow(v) {
        this._selectedRow = v
    }

    /**
     * 渲染列表
     * @param {*} dataSource 
     * @param {*} children 
     * @param {*} multiply  是否多选
     */
    renderBody(dataSource, _children, options) {
        let ths = [], trs = []
        for (const item of _children) {
            const { title } = item.props
            ths.push(<th key={`td_${title}`}>{title}</th>)
        }
        const { multiply } = options
        if (dataSource) {
            for (const data of dataSource) {
                let tds = []
                for (const item of _children) {
                    const { indicator, children } = item.props;
                    let td = null;
                    if (indicator) { // 是否可选
                        td = multiply ?
                            <CheckBox onClick={e => { console.log(e) }}></CheckBox> :
                            <RadioBox onClick={() => { this.selectedRow = data }}></RadioBox>
                    } else if (children instanceof Function) {
                        td = children(data)
                    } else {
                        td = item
                    }
                    tds.push(<td key={`td-${Math.random() * Number(new Date())}`}>{td}</td>)
                }
                trs.push(<tr key={`tr-${Math.random() * Number(new Date())}`}>{tds}</tr>);
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
        pageSize: 10,
        total: 0
    }
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