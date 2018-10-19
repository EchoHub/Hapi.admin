import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Canvas } from "common";
import "./canvas.scss"

export default class CanvasRoom extends Component {
    render() {
        return <div className="hp-canvas_room">
            <div className="hp-sp-row">
                <div className="hp-col hp-col-24">
                    <Panel className="mv-10 data-panel" title="Wave曲线" toolbar={true}>
                        <Canvas 
                        options={{
                            model: "waveLine"
                        }}
                        ></Canvas>
                    </Panel>
                </div>
            </div>
        </div>
    }
}