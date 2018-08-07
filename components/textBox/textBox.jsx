import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./textBox.scss"

export default class TextBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return <input {...props} />
    }
}
TextBox.defaultProps = {
    type: "text",
    className: "hp-textbox"
}