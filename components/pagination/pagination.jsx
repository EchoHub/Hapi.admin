import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { ListItem, Select, TextBox, Button } from "common";
import "./pagination.scss"

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.jumpHandle = this.jumpHandle.bind(this)
    }
    render() {
        const { page, pageSize, total, load } = this.props;
        const count = Math.ceil(total / pageSize);
        let steps = [], index = 1;
        while (index <= count) {
            const _i = index;
            steps.push(<li
                key={`li-${index}`}
                className={_i === page ? "active" : ""}
                onClick={() => { load(_i, pageSize) }}
            >
                <a href="javascript:;">{index}</a>
            </li>
            )
            index++;
        }
        return <ul className="hp-pagination">
            <li>共 {total} 条，</li>
            <li><Select 
            ref="select"
            value={pageSize}
            onChange={(vNode) => { load(page, +this.refs.select.value)}}
            >
                <ListItem value={5}>5</ListItem>
                <ListItem value={10}>10</ListItem>
                <ListItem value={50}>50</ListItem>
                <ListItem value={100}>100</ListItem>
            </Select> 条／页，
            </li>
            <section className="float-right">
                {steps}
                <li>&nbsp;跳转至 <TextBox ref="input" required></TextBox> 页 <Button onClick={this.jumpHandle}>跳转</Button></li>
            </section>
        </ul>
    }

    jumpHandle() {
        const input = this.refs.input;
        const value = input.value;
        const { load, pageSize } = this.props;
        if(value) {
            load(value, pageSize)
        }
    }
}
Pagination.propTypes = {
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
}
Pagination.defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0
}