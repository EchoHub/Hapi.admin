import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { ListItem, Select, TextBox, Button } from "common";
import "./pagination.scss"

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = { }
        this.jumpHandle = this.jumpHandle.bind(this)
        this.loadHandle = this.loadHandle.bind(this)
    }
    componentWillReceiveProps(props) {
        const { page, size, total } = props 
        this.setState({
            page: page,
            size: size,
            total: total
        })
    }
    componentDidMount() {}
    render() {
        const { options } = this.props;
        const { page, size, total } = this.state;
        const count = Math.ceil(total / size);
        let steps = [], index = 1;
        while (index <= count) {
            const _i = index;
            steps.push(<li
                key={`li-${index}`}
                className={_i == page ? "active" : ""}
                onClick={() => this.loadHandle({ ...options, page: _i, size })}
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
                value={size}
                onChange={(vNode) => this.loadHandle({
                    ...options,
                    page,
                    size: this.refs.select.value
                })}
            >
                <ListItem value={5}>5</ListItem>
                <ListItem value={10}>10</ListItem>
                <ListItem value={50}>50</ListItem>
                <ListItem value={100}>100</ListItem>
            </Select> 条／页
            </li>
            <section className="float-right">
                {steps}
                <li>&nbsp;跳转至 <TextBox ref="input" required></TextBox>&nbsp;页，&nbsp;<Button className="hp-jump-buttons" onClick={this.jumpHandle}>跳转</Button></li>
            </section>
        </ul>
    }

    loadHandle(options) {
        const { load, parent } = this.props;
        load(options, (data, total) => {
            parent.setState({
                paginationOptions: options,
                dataSource: data
            })
            this.setState({
                total: total
            })
        })
    }

    jumpHandle() {
        const input = this.refs.input;
        const value = input.value;
        const { options } = this.props;
        const { size } = this.state;
        if (value) {
            if(!/^\d*/.test(value) || value < 1 || value > size) return;
            this.loadHandle({
                ...options,
                size,
                page: value
            })
        }
    }
}
Pagination.propTypes = {
    page: PropTypes.number || PropTypes.string,
    size: PropTypes.number,
    total: PropTypes.number,
}
Pagination.defaultProps = {
    page: 1,
    size: 10,
    total: 0
}