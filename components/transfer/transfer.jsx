import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import * as DOM from "dom/dom";
import { arrayEliminator } from "utils/utils"
import { CheckBox, TextBox } from "common";
import { getPinYinOfChar } from "pinyin/pinyin"
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./transfer.scss"

export default class Transfer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetSource: [],
            dataSource: [],
            selectedDataSource: [],
            selectedTargetSource: []
        }
        this.dataSource_origin = []
        this.targetSource_origin = []

        this.toggleCbClass = this.toggleCbClass.bind(this)
        this.toTargetHandle = this.toTargetHandle.bind(this)
        this.toSourceHandle = this.toSourceHandle.bind(this)
    }

    componentWillReceiveProps(props) {
        const { targetSource, dataSource } = props;
        this.dataSource_origin = dataSource
        this.targetSource_origin = targetSource
        this.setState({
            targetSource: targetSource,
            dataSource: dataSource
        })
        this.dataSource_pre = []
        this.targetSource_pre = []
    }

    componentDidMount() {
        const { targetSource, dataSource } = this.props;
        this.dataSource_origin = dataSource
        this.targetSource_origin = targetSource
        this.setState({
            targetSource: targetSource,
            dataSource: dataSource
        })
    }
    render() {
        const { prefixCls, className, allCheck, sourceTitle, targetTitle, showSearch } = this.props;
        const { dataSource, targetSource, selectedDataSource, selectedTargetSource } = this.state;
        const classes = classNames(prefixCls, className);
        const bodyClasses = classNames("hp-transfer-body", {
            [`hassearch`]: showSearch
        })
        return <div className={classes}>
            <div ref="datasource_list" className="hp-transfer-list">
                <div className="hp-transfer-header">
                    {allCheck ? <CheckBox
                        ref="dataSourceAll_cb"
                        onClick={this.selectedAll.bind(this, 1)}
                    ></CheckBox> : null}
                    {sourceTitle ? <span className="title">{sourceTitle}（ {selectedDataSource.length} ／ {dataSource.length} 项 ）</span> : null}
                </div>
                {showSearch ? <div className="hp-transfer_search">
                    <TextBox onChange={(vNode) => this.handleSearch(1, vNode)}></TextBox>
                    <i className="iconfont icon-search"></i>
                </div> : null}
                <div className={bodyClasses}>
                    {
                        dataSource.map((item, i) =>
                            <div className="item"
                                key={"datasource-" + item.key}
                                onClick={event => { this.dataSourceSelectHandle(i, item) }}
                            >
                                <CheckBox
                                    ref={`dataSource_cb_${i}`}
                                    value={item.key}
                                >{item.content}</CheckBox>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="hp-transfer-operation">
                <div className="toolbtn totarget" onClick={this.toTargetHandle}>
                    <i className="iconfont icon-enter"></i>
                </div>
                <div className="toolbtn tosource" onClick={this.toSourceHandle}>
                    <i className="iconfont icon-return"></i>
                </div>
            </div>
            <div ref="targetsource_list" className="hp-transfer-list">
                <div className="hp-transfer-header">
                    {allCheck ? <CheckBox
                        ref="targetSourceAll_cb"
                        onClick={this.selectedAll.bind(this, 2)}
                    ></CheckBox> : null}
                    {targetTitle ? <span className="title">{targetTitle}（ {selectedTargetSource.length} / {targetSource.length} 项 ）</span> : null}
                </div>
                {showSearch ? <div className="hp-transfer_search">
                    <TextBox onInput={(vNode) => this.handleSearch(2, vNode)}></TextBox>
                    <i className="iconfont icon-search"></i>
                </div> : null}
                <div className={bodyClasses}>
                    {
                        targetSource.map((item, i) =>
                            <div className="item"
                                key={"target-" + item.key}
                                onClick={event => { this.targetSelectHandle(i, item) }}
                            >
                                <CheckBox
                                    ref={`targetSource_cb_${i}`}
                                    value={item.key}
                                >{item.content}</CheckBox>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    }

    handleSearch(type, vNode) {
        const value = vNode.target.value.trim();
        let result = []
        if (type === 1) {
            for (const item of (this.dataSource_origin || [])) {
                const val = !!value && !this.match(value, item.content);
                if (!val) {
                    result.push(item)
                }
            }
            this.setState({
                dataSource: result
            });
            return
        }
        for (const item of (this.targetSource_origin || [])) {
            const val = !!value && !this.match(value, item.content);
            if (!val) {
                result.push(item)
            }
        }
        this.setState({
            targetSource: result
        });
    }

    /**
     * 模糊匹配
     * @param {*} value 
     * @param {*} item 
     */
    match(value, item) {
        value = value.toLowerCase();
        let c;
        if (!c) {
            c = {
                lower: item.toLowerCase(),
                pinyin: item.split("").map(x => getPinYinOfChar(x).join("|") || "_").join("").toLowerCase(),
                py: item.split("").map(x => (getPinYinOfChar(x).join("|") || "_")[0]).join("").toLowerCase()
            }
        }

        if (c.lower.indexOf(value) >= 0) {
            return true;
        }

        if (c.pinyin.indexOf(value) >= 0) {
            return true;
        }

        if (c.py.indexOf(value) >= 0) {
            return true;
        }

        return false;
    }

    toTargetHandle() {
        const { selectedDataSource, dataSource } = this.state;
        if (selectedDataSource && selectedDataSource.length) {
            const dataSource_ = arrayEliminator(dataSource, selectedDataSource)
            this.refs["dataSourceAll_cb"].checked = false;

            this.dataSource_origin = arrayEliminator(this.dataSource_origin, selectedDataSource)
            this.targetSource_origin = this.targetSource_origin.concat(selectedDataSource)
            this.setState(prevState => {
                return {
                    targetSource: prevState.targetSource.concat(selectedDataSource),
                    selectedDataSource: [],
                    dataSource: dataSource_
                }
            })
        }
    }

    toSourceHandle() {
        const { selectedTargetSource, targetSource } = this.state;
        if (selectedTargetSource && selectedTargetSource.length) {
            const targetSource_ = arrayEliminator(targetSource, selectedTargetSource);
            this.refs["targetSourceAll_cb"].checked = false;

            this.targetSource_origin = arrayEliminator(this.targetSource_origin, selectedTargetSource)
            this.dataSource_origin = this.dataSource_origin.concat(selectedTargetSource)
            this.setState(prevState => {
                return {
                    dataSource: prevState.dataSource.concat(selectedTargetSource),
                    selectedTargetSource: [],
                    targetSource: targetSource_
                }
            })
        }
    }

    toggleCbClass(target) {
        DOM.toggleClass(target, "active");
        return DOM.hasClass(target, "active")
    }

    dataSourceSelectHandle(index, info) {
        const cb = this.refs[`dataSource_cb_${index}`];
        cb.checked = !cb.checked
        const { selectedDataSource } = this.state;
        let result = [];
        if (cb.checked) {
            if (selectedDataSource && selectedDataSource.length) {
                for (const item of selectedDataSource) {
                    if (item.key !== info.key) result.push(item)
                }
            }
        } else {
            result = [info]
        }
        this.checkAllSelected(1, index)
        this.setState({
            selectedDataSource: !cb.checked ? selectedDataSource.concat(result) : result,
        })
    }

    targetSelectHandle(index, info) {
        const cb = this.refs[`targetSource_cb_${index}`];
        cb.checked = !cb.checked
        const { selectedTargetSource } = this.state;
        let result = [];
        if (cb.checked) {
            if (selectedTargetSource && selectedTargetSource.length) {
                for (const item of selectedTargetSource) {
                    if (item.key !== info.key) result.push(item)
                }
            }
        } else {
            result = [info]
        }
        this.checkAllSelected(2, index)
        this.setState({
            selectedTargetSource: !cb.checked ? selectedTargetSource.concat(result) : result,
        })
    }

    selectedAll(type) {
        const { dataSource, targetSource } = this.state;
        const allCb = this.refs[type === 1 ? "dataSourceAll_cb" : "targetSourceAll_cb"];
        const nodes = DOM.query(this.refs[type === 1 ? "datasource_list" : "targetsource_list"], ".hp-transfer-body .hp-checkbox");
        const len = nodes.length;
        for (let i = 0; i < len; i++) {
            const cb = this.refs[type === 1 ? `dataSource_cb_${i}` : `targetSource_cb_${i}`];
            cb.checked = allCb.checked;
        }
        if (type === 1) {
            this.setState({
                selectedDataSource: allCb.checked ? dataSource : []
            })
        } else {
            this.setState({
                selectedTargetSource: allCb.checked ? targetSource : []
            })
        }
    }
    /**
     * 检测是否全部选中
     */
    checkAllSelected = (type, index) => {
        const len = DOM.query(
            this.refs[type === 1 ?
                "datasource_list" :
                "targetsource_list"],
            ".hp-transfer-body  .hp-checkbox"
        ).length
        let allSelected = true;
        for (let i = 0; i < len; i++) {
            const cb = this.refs[type === 1 ? `dataSource_cb_${i}` : `targetSource_cb_${i}`];
            const cb_checked = i !== index ?
                cb.state.checked
                : !cb.state.checked;
            if (!cb_checked) {
                allSelected = false;
                break;
            }
        }
        this.refs[type === 1 ? "dataSourceAll_cb" : "targetSourceAll_cb"].checked = allSelected
    }

}
Transfer.propTypes = {
    prefixCls: PropTypes.string
}
Transfer.defaultProps = {
    prefixCls: "hp-transfer",
    allCheck: true,
    dataSource: [],
    targetSource: [],
    sourceTitle: "Source",
    targetTitle: "Target",
    showSearch: false
}