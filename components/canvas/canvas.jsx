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
        const options = this.props.options || {};
        return <canvas ref="canvas"
            width={options.width / 2}
            height={options.height / 2}
            className="hp-canvas"></canvas>
    }
}
Canvas.propTypes = {
    // 使用已有模型
    model: PropTypes.string,
    run: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    defaultData: PropTypes.object
}

// 默认值
const defaultWidth = 200;
const defaultHeight = 80;

Canvas.defaultProps = {
    options: {
        width: defaultWidth, // 宽度
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
    canvas.width = options.width || defaultWidth;
    canvas.height = options.height || defaultHeight;
    const ctx = canvas.getContext("2d");
    switch (options.model) {
        case "waveLine":
            const data = options.data || [defaultData];
            if (options.run) {
                setInterval(() => {
                    for (const item of data) {
                        function valueMapping(x, inMin, inMax, outMin, outMax) {
                            return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
                        }
                        item.xSpeed = 100 + Math.random() * 100 + valueMapping(Math.random(), 0, 1, -0.05, -0.08);
                        requestAnimationFrame(() => drawWave.call(this, ctx, item));
                    }
                }, 100);
                return
            }
            for (const item of data) {
                drawWave.call(this, ctx, item);
            }
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
function drawWave(ctx, data) {
    let xSpeed = data.xSpeed;
    const options = this.options;
    ctx.clearRect(0, 0, options.width, options.height);
    const width = options.width || defaultWidth;
    const height = options.height || defaultHeight;
    // const xSpeed = data.xSpeed, amplitude = data.amplitude, scale = data.scale;
    const amplitude = data.amplitude, scale = data.scale;
    ctx.lineWidth = options.lineWidth || 1;
    const gradients = [
        ['#6e45e2', '#88d3ce'],
        ['#de6262', '#ffb88c'],
        ['#64b3f4', '#c2e59c'],
        ['#0fd850', '#f9f047'],
        ['#007adf', '#00ecbc'],
        ['#B6CEE8', '#F578DC'],
        ['#9be15d', '#00e3ae']
    ]
    const [start, stop] = gradients[parseInt(Math.random() * 7)];
    var grad = ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, start);
    grad.addColorStop(1, stop);
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    // function valueMapping(x, inMin, inMax, outMin, outMax) {
    //     return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    // }
    // xSpeed = valueMapping(xSpeed, 0, 1, -0.05, -0.08)
    for (let x = 0; x < width; x++) {
        const radians = x / width * Math.PI * 2;
        const scale = (Math.sin(radians - Math.PI * 0.5) + 1) * 0.5;
        const y = height / 2 + Math.sin(x * 0.02 + xSpeed) * amplitude * scale;
        ctx.lineTo(x, y);
    }
    ctx.stroke()
    ctx.closePath();
}