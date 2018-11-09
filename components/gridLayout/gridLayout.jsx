import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./gridLayout.scss"

/**
 * @desc 栅格容器
 */
export default class GridLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    init() {
        // 初始化参数
        const { theme, justify } = this.props;
        let justifyContent = ""
        if(theme === "flex") {
            justifyContent = ` ${justify}`
        }
        this.setState({
            className: `hp-gridlayout ${theme}${justifyContent}`
        });
    }
    componentDidMount() {
        this.init();
    }
    render() {
        const { children, justify } = this.props;
        const { className } = this.state;
        return <div className={className}>{children}</div>
    }
}
GridLayout.propTypes = {
    theme: PropTypes.string
}
GridLayout.defaultProps = {
    theme: "default"
}

/**
 * @desc 栅格
 */
export class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    init() {
        // 初始化
        const { children, col } = this.props;
        this.setState({
            className: `hp-layout hp-layout-${col}`
        });
    }
    componentDidMount() {
        this.init();
    }
    render() {
        const { children, col } = this.props;
        const { className } = this.state;
        return <div className={className}>{children}</div>
    }
}
Layout.propTypes = {
    col: PropTypes.number
}
Layout.defaultProps = {
    col: 1
}