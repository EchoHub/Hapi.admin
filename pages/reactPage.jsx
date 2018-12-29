import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from "common"
import "./reactPage.scss"

export default class ReactPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        console.log("constructor")
    }
    getDetafulProps() {
        console.log("getDetafulProps")
    }
    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps")
    }
    componentDidCatch() {
        console.log("componentDidCatch")
    }
    componentWillMount() {
        console.log("componentWillMount")
    }
    componentDidMount() {
        console.log("componentDidMount")
    }
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate")
        return true;
    }
    componentWillUpdate() {
        console.log("componentWillUpdate")
    }
    componentDidUpdate() {
        console.log("componentDidUpdate")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    change = () => {
        
    }

    render() {
        return <div className="hp-reactpage">
            <Panel title="React" toolbar={true}>
                <h3>生命周期图解</h3>
                <img className="hp-react_life" src={require("static/react_life.png")} />
            </Panel>
        </div>
    }
}