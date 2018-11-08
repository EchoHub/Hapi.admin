import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { Panel, Chart } from "common"
import "./console.scss"

export default class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
                { title: "Blog", color: "blog", href: "https://echohub.github.io/hapi" },
                { title: "QQ", color: "qq", href: "1750978657" },
                { title: "Wechat", color: "wechat", href: "xy1750978657" },
                { title: "GitHub", color: "github", href: "https://github.com/EchoHub" }
            ],
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
            tableData2: [
                {
                    title: "按钮",
                    data: [
                        {
                            title: "9.01",
                            data: 999
                        },
                        {
                            title: "9.02",
                            data: 888
                        },
                        {
                            title: "9.03",
                            data: 666
                        },
                        {
                            title: "9.04",
                            data: 777
                        },
                        {
                            title: "9.05",
                            data: 444
                        },
                        {
                            title: "9.06",
                            data: 555
                        },
                        {
                            title: "9.07",
                            data: 111
                        }
                    ]
                },
                {
                    title: "表单",
                    data: [
                        {
                            title: "9.01",
                            data: 222
                        },
                        {
                            title: "9.02",
                            data: 333
                        },
                        {
                            title: "9.03",
                            data: 888
                        },
                        {
                            title: "9.04",
                            data: 555
                        },
                        {
                            title: "9.05",
                            data: 777
                        },
                        {
                            title: "9.06",
                            data: 999
                        },
                        {
                            title: "9.07",
                            data: 666
                        }
                    ]
                }
            ],
            options: {}
        }
    }
    componentDidMount() {
        const pie_panel = this.refs.pie_panel;
        const offsetWidth = pie_panel.offsetWidth;
        const offsetHeight = pie_panel.offsetHeight;
        this.setState({
            options: {
                title: "控件使用数",
                width: this.refs.pl_chart.offsetWidth,
                color: "#2196f3",
                height: 283
            },
            options2: {
                title: "控件使用数",
                font: {
                    top: 20,
                    fontSize: 24,
                },
                lineWidth: 50,
                legend: true,
                width: offsetWidth,
                height: offsetHeight
            },
            options3: {
                title: "按钮、表单近7日使用对比",
                font: {
                    top: 20,
                    fontSize: 24,
                },
                lineWidth: 50,
                legend: true,
                width: offsetWidth,
                height: offsetHeight
            }
        })
    }
    render() {
        const { contacts, options, options2, options3, tableData, tableData2, tableData3 } = this.state;
        return <div className="hp-console">
            <div className="hp-sp-row">
                <ul className="hp-col hp-col-24 contacts_ul">
                    {
                        contacts.map((contact, index) =>
                            <li className="hp-col hp-col-6" key={`contacts_${index}`}>
                                <a className={contact.color} href={contact.href} target="_blank">{contact.title}</a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="hp-sp-row">
                <Panel className="hp-col hp-col-24 mv-10 data-panel" title="柱状图" toolbar={true}>
                    <div ref="pl_chart" className="pl_chart">
                        <Chart
                            type="bar"
                            options={options}
                            data={tableData}
                        ></Chart>
                    </div>
                    <div className="pr_order">
                        <div className="title">控件使用数</div>
                        <ul>
                            {
                                tableData.map((d, i) =>
                                    <li key={`pr_order_li_${i}`}>
                                        <i className={`order_index${i < 3 ? " flag" : ""}`}>{i + 1}</i>
                                        <span className="">{d.title}</span>
                                        <span className="float-right">{d.data}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </Panel>
            </div>
            <div className="hp-sp-row">
                <Panel className="hp-col hp-col-12 mv-10" title="饼状图" toolbar={true}>
                    <div ref="pie_panel">
                        <Chart
                            type="pie"
                            options={options2}
                            data={tableData}
                        >
                        </Chart>
                    </div>
                </Panel>
                <Panel className="hp-col hp-col-12 mv-10" title="线性图" toolbar={true}>
                    <div ref="line_panel">
                        <Chart
                            type="line"
                            options={options3}
                            data={tableData2}
                        >
                        </Chart>
                    </div>
                </Panel>
            </div>
        </div>
    }
}