import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { Panel, Chart } from "common"
import "./console.scss"

export default class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [
                {
                    title: "按钮",
                    data: 999
                },
                {
                    title: "表单",
                    data: 888
                },
                {
                    title: "轮播",
                    data: 777
                },
                {
                    title: "消息提示",
                    data: 666
                },
                {
                    title: "模态窗",
                    data: 555
                },
                {
                    title: "穿梭框",
                    data: 444
                },
                {
                    title: "面包屑",
                    data: 333
                },
            ],
            options: {}
        }
    }
    componentDidMount() {
        this.setState({
            options: {
                title: "控件使用数",
                width: this.refs.pl_chart.offsetWidth,
                color: "#2196f3",
                height: 283
            },
            options2: {
                title: "控件使用数",
                lineWidth: 50,
                legend: true,
                width: this.refs.pie_panel.offsetWidth,
                height: 200
            }
        })
    }
    render() {
        return <div className="hp-console">
            <div className="hp-sp-row">
                <div className="hp-col hp-col-24">
                    <Panel className="mv-10 data-panel" title="柱状图" toolbar={true}>
                        <div ref="pl_chart" className="pl_chart">
                            <Chart
                                type="bar"
                                options={this.state.options}
                                data={this.state.tableData}
                            ></Chart>
                        </div>
                        <div className="pr_order">
                            <div className="title">控件使用数</div>
                            <ul>
                                {
                                    this.state.tableData.map((d, i) =>
                                        <li key={`pr_order_li_${i}`}><i className={`order_index${i < 3 ? " flag" : ""}`}>{i + 1}</i><span className="">{d.title}</span><span className="float-right">{d.data}</span></li>
                                    )
                                }
                            </ul>
                        </div>
                    </Panel>
                </div>
            </div>
            <div className="hp-sp-row">
                <Panel className="hp-col hp-col-12 mv-10" title="饼状图" toolbar={true}>
                    <div ref="pie_panel">
                        <Chart
                            type="pie"
                            options={this.state.options2}
                            data={this.state.tableData}
                        >
                        </Chart>
                    </div>
                </Panel>
                <Panel className="hp-col hp-col-12 mv-10" title="线性图" toolbar={true}>
                <div ref="line_panel">
                        <Chart
                            type="line"
                            data={this.tableData}
                        >
                        </Chart>
                </div>
                </Panel>
            </div>
        </div>
    }
}