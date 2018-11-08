import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Canvas } from "common";
import "./canvas.scss"

export default class CanvasRoom extends Component {
    render() {
        return <div className="hp-canvas_room">
            <div className="hp-sp-row">
                <div className="hp-col hp-col-24">
                    <Panel className="mv-10 data-panel" title="正弦曲线使用" toolbar={true}>
                        <section>
                            正弦曲线公式：y = A sin(Bx + C) + D
                            <br />
                            <ol>
                                <li>A 控制振幅，A 值越大，波峰和波谷越大，A 值越小，波峰和波谷越小；</li>
                                <li>B 值会影响周期，B 值越大，那么周期越短，B 值越小，周期越长。</li>
                                <li>C 值会影响图像左右移动，C 值为正数，图像右移，C 值为负数，图像左移。</li>
                                <li>D 值控制上下移动。</li>
                            </ol>
                        </section>
                        <Canvas
                            options={{
                                model: "waveLine",
                                width: 800,
                                height: 200,
                                data: [
                                    {
                                        xSpeed: 0,
                                        amplitude: 30,
                                        scale: 1
                                    },
                                    {
                                        xSpeed: 0,
                                        amplitude: 50,
                                        scale: 2
                                    },
                                    {
                                        xSpeed: 0,
                                        amplitude: 70,
                                        scale: 3
                                    },
                                    {
                                        xSpeed: 0,
                                        amplitude: 80,
                                        scale: 4
                                    },
                                    {
                                        xSpeed: 0,
                                        amplitude: 100,
                                        scale: 5
                                    }
                                ]
                            }}
                        ></Canvas>
                        <Canvas
                            options={{
                                run: true,
                                model: "waveLine",
                                width: 800,
                                height: 200,
                                data: [
                                    {
                                        xSpeed: 0,
                                        amplitude: 30,
                                        scale: 1
                                    }
                                ]
                            }}
                        ></Canvas>
                    </Panel>
                </div>
            </div>
        </div>
    }

}