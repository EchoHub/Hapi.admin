import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import "./chart.scss"

export default class Chart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props
        const options = props.options;
        const data = props.data;
        let result = null;
        switch (props.type) {
            case "bar":
                // 柱状图
                result = bar(this, options, data);
                break;
            case "pie":
                // 饼状图
                result = pie(this, options, data);
                break;
            case "line":
                // 折线图
                result = line(this, options, data);
                break
            default:
                break;
        }
        return <div className="hp-chart">
            <canvas className="hp-chart_canvas" ref="canvas"></canvas>
            <div ref="hp_chart_tooltip" className="hp-chart_tooltip"></div>
        </div>
    }
}
export function bar(target, options, data) {
    if (!target.refs.canvas) return null;
    options = options || {}
    let barColor = options["color"] || "rgb(47, 194, 91)";
    const _data = data.map(d => d.data);
    const maxValue = Math.max(...(data.map(d => d.data)));
    const minValue = Math.min(...(data.map(d => d.data)));
    const canvas = target.refs.canvas;
    const ctx = canvas.getContext("2d");
    const width = (options.width || 150) * 2;
    const height = (options.height || 110) * 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style = `opacity:1; width: ${width / 2}px; height: ${height / 2}px`;
    const rectH = 10, rectW = 20;

    // 绘制标题
    const fontparam = options.font || {};
    ctx.font = `${fontparam.fontSize || "30"}px arial`;
    ctx.fillStyle = "rgb(51,51,51)";
    ctx.fillText(options.title || "标题", fontparam.left || 0, fontparam.top || 30);
    //绘制表格
    const sourceX = 50;
    const sourceY = height - 50
    const endX = width - 30;
    const endY = 50
    // 绘制 横轴
    const avgHeight = sourceY / data.length;
    const avgWidth = width / data.length;
    for (let i = 0; i < data.length - 1; i++) {
        const _height = (avgHeight) * (i + 1);
        const _width = (avgWidth) * (i + 1);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#bbb";
        ctx.moveTo(sourceX, _height);
        ctx.lineTo(endX, _height);
        ctx.stroke();
        ctx.closePath();
        ctx.font = '20px "Monospaced Number","Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif';
        ctx.fillStyle = '#555';
        
        // 绘制y轴标题
        ctx.font = '24px "Monospaced Number","Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif';
        ctx.fillText(data[i].data, 0, _height + 10);
        // 绘制x轴标题
        ctx.fillText(data[i].title, _width - (data[i].title.length * 10), avgHeight * data.length + 30);
        // 绘制x轴坐标线
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.moveTo(_width, avgHeight * data.length);
        ctx.lineTo(_width, avgHeight * data.length - 10);
        ctx.stroke();
        ctx.closePath();

        const h = -avgHeight * data.length + _height;
        ctx.beginPath();
        // ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = barColor;
        let step = 0;
        const timer = setInterval(() => {
            if (step > h) {
                ctx.fillRect(_width - 20, avgHeight * data.length, 40, step)
                ctx.fill();
                step += h / 10
            } else {
                clearInterval(timer)
            }
        }, 20);
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(endX, sourceY);
    ctx.stroke();
    ctx.closePath();
    let _preX = 0
    // canvas.addEventListener("mousemove", e => {
    //     const layX = e.layerX;
    //     const layY = e.layerY;
    //     const _data = data[Math.floor(layX * 2 / avgWidth)]
    //     const toolTip = target.refs.hp_chart_tooltip;
    //     toolTip.innerHTML = "";
    //     const span = document.createElement("span");
    //     span.className = "title"
    //     span.innerHTML = _data.title;
    //     toolTip.appendChild(span);
    //     const span2 = document.createElement("span");
    //     span2.className = "content"
    //     const style = `background:${barColor};display:inline-block;border-radius:50%;width:8px;height:8px;margin:0 10px;`
    //     span2.innerHTML = `<span style="${style}"></span>${_data.data}`;
    //     toolTip.appendChild(span2);
    //     toolTip.style = `top: ${layY}px;left: ${layX}px`;
    //     canvas.addEventListener("mouseleave", e => {

    //     })
    // });
    return canvas;
}

export function pie(target, options, data) {
    if (!target.refs.canvas) return null;
    options = options || {}
    let total = 0;
    const _data = data.map(d => {
        total += d.data || 0;
        return d.data
    });
    let _new_data = []
    for (const item of _data) {
        _new_data.push(item / total);
    }
    const canvas = target.refs.canvas;
    const width = (options.width || 150) * 2;
    const height = (options.height || 110) * 2;
    const originX = width / 2;
    const originY = height / 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style = `opacity:1; width: ${width / 2}px; height: ${height / 2}px`;
    const ctx = canvas.getContext("2d");
    const fontparam = options.font || {};
    ctx.font = `${fontparam.fontSize + "px" || "30px"} arial`;
    ctx.fillStyle = "#000";
    ctx.fillText(options.title || "标题", fontparam.left || 0, fontparam.top || 30);

    // 绘制饼图
    let num = 1;
    let startAngle = 0;
    for (const _data of _new_data) {
        let color;
        if (_new_data.length <= 10) {
            color = ["#2196f3", "#7CCD7C", "#ff6600", "#F0FFF0", "#FF69B4", "#FFD700", "#90EE90", "#48D1CC", "#AB82FF", "#FF4040"][num - 1]
        } else {
            color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        }
        const angle = _data * 2 * Math.PI;
        let step = 0;
        const targetAngle = startAngle + angle;
        const timer = setTimeout(pieDraw.bind(null, {
            x: originX,
            y: originY,
            options: options,
        }, startAngle, step, angle, ctx, color, timer), 20);
        startAngle += num === 1 ? angle : _new_data[num - 1] * 2 * Math.PI;
        // 绘制 legend 注释
        if (options.legend) {
            ctx.font = "18px arial"
            ctx.fillStyle = color;
            ctx.fillRect(width - 130, num * 30 - 15, 20, 15)
            ctx.fillText(data[num - 1].title, width - 100, num * 30)
        }
        num++;
    }
    return canvas;
}
function pieDraw(param, start, step, angle, canvas, color, timer) {
    canvas.beginPath();
    canvas.strokeStyle = color;
    if (step < angle) {
        step += angle / 10;
        canvas.arc(param.x, param.y, (param.y < param.x ? param.y : param.x) * .8, start, start + step);
        canvas.lineWidth = param.options.lineWidth || 40;
        canvas.stroke();
        const timer2 = setTimeout(pieDraw.bind(null, param, start, step, angle, canvas, color, timer2), 20)
    }
    canvas.closePath();
    clearTimeout(timer);
}
export function line(target, options, data) {
    if (!target.refs.canvas) return null;
    options = options || {}
    let barColor = options["color"] || "rgb(47, 194, 91)";
    const _data = data.map(d => d.data);
    const canvas = target.refs.canvas;
    const ctx = canvas.getContext("2d");
    const width = (options.width || 150) * 2;
    const height = (options.height || 110) * 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style = `opacity:1; width: ${width / 2}px; height: ${height / 2}px`;
    const rectH = 10, rectW = 20;

    // 绘制标题
    const fontparam = options.font || {};
    ctx.font = `${fontparam.fontSize + "px" || "30px"} arial`;
    ctx.fillStyle = "#000";
    ctx.fillText(options.title || "标题", fontparam.left || 0, fontparam.top || 30);
    //绘制表格
    const sourceX = 50;
    const sourceY = height - 50
    const endX = width - 30;
    const endY = 50;
    let maxValue = 0, minValue = 0, len, elemLen = [], xLengend = [];
    for (const item of _data) {
        const _dataArea = item.map((d, i) => d.data);
        const _dataTitle = item.map(d => d.title);
        maxValue = Math.max(..._dataArea);
        minValue = minValue ? Math.min(..._dataArea, minValue) : Math.min(..._dataArea);
        elemLen.push(_dataArea.length)
        xLengend = _dataTitle;
    }
    // 绘制横轴
    len = Math.max(...elemLen);
    const avgHeight = (sourceY - endY) / len;
    const avgWidth = (endX - sourceX) / (len + 1);
    const yValue = (maxValue - minValue) / (len - 1);
    // 折线图
    let index = 0;
    for (const item of _data) {
        let preX = avgWidth, preY = endY + (1 - item[0].data / maxValue) * (sourceY - endY);
        let color;
        if(_data.length <= 10) {
            color = ["#2196f3", "#7CCD7C", "#ff6600", "#F0FFF0", "#FF69B4", "#FFD700", "#90EE90", "#48D1CC", "#AB82FF", "#FF4040"][index]
        }else {
            color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        const _dataArea = item.map((d, i) => {
            if (i > 0) {
                ctx.beginPath();
                const y = endY + (1 - d.data / maxValue) * (sourceY - endY);
                ctx.moveTo(preX, preY);
                ctx.lineTo(avgWidth * (i + 1), y);
                preX = avgWidth * (i + 1);
                preY = y;
                ctx.stroke();
                ctx.closePath();
            }
            return d.data
        });
        index++;
    }
    ctx.lineWidth = 1;
    for (let j = 0; j < len; j++) {
        ctx.beginPath();
        ctx.strokeStyle = "#bbb";
        const _y = avgHeight * (j + 1);
        const _x = avgWidth * (j + 1);
        ctx.moveTo(sourceX, sourceY - _y);
        ctx.lineTo(endX - 80, sourceY - _y);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "#555";
        ctx.font = "20px arail";
        // y轴 标题
        ctx.fillText(minValue + yValue * j, 0, sourceY - _y + 9);
        ctx.font = "24px arail";
        // x轴 标题
        ctx.fillText(xLengend[j], _x - xLengend[j].length * 5, sourceY + 30)
        ctx.beginPath();
        ctx.moveTo(_x, sourceY);
        ctx.lineTo(_x, sourceY - 10);
        ctx.strokeWidth = 4;
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(endX - 80, sourceY);
    ctx.stroke();
    ctx.closePath();
    return canvas;

}