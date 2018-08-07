import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./navMenu.scss"

export default class NavMenu extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        const theme = props.theme;
        return <div className={`hp-navmenu ${theme} active`}>
            123
        </div>
    }
}
NavMenu.defaultProps = {
    theme: "primary"
}