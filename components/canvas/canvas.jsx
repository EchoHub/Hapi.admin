import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./canvas.scss"

export default class Canvas extends Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() { }

    componentDidMount() {
        const props = this.props;

        const options = props.options;
        this.setState({
            model: (new CanvasModel(options, this.elem)).draw()
        })
    }

    get elem() {
        return this.refs.canvas
    }

    render() {
        return <canvas ref="canvas" className="hp-canvas"></canvas>
    }
}
Canvas.propTypes = {
    // 使用已有模型
    model: PropTypes.string
}

// 默认值
const defaultWidht = 200;
const defaultHeight = 80;

Canvas.defaultProps = {
    options: {
        width: defaultWidht, // 宽度
        height: defaultHeight, // 高度
        model: "default" // 模型名称
    }
}
function CanvasModel(options, elem) {
    this.options = options;
    this.canvas = elem;
}
// 绘图
CanvasModel.prototype.draw = function () {
    const options = this.options;
    const canvas = this.canvas;
    canvas.width = options.width || defaultWidht;
    canvas.height = options.height || defaultHeight;
    const ctx = canvas.getContext("2d");
    switch (options.model) {
        case "waveLine":
            drawWave(ctx);
            break;
        case "default":
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "#000");
            gradient.addColorStop("0.5", "#444");
            gradient.addColorStop("1.0", "#888");
            ctx.font = "40px Arial";
            // 用渐变填色
            ctx.fillStyle = gradient;
            ctx.fillText("我是画布", 0, canvas.height / 2);
            break;
    }
    return canvas;
}
// 画 wave曲线
function drawWave(ctx) {
    
}