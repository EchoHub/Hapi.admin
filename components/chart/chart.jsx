import React, { Component } from 'react';
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
            <canvas ref="canvas"></canvas>
            <div ref="hp_chart_tooltip" className="hp-chart_tooltip"></div>
        </div>
    }
}
export function bar(target, options, data) {
    if (!target.refs.canvas) return null;
    options = options || {}
    let bar, barColor = options["color"] || "rgb(47, 194, 91)";
    const _data = data.map(d => d.data);
    const maxValue = Math.max(...(data.map(d => d.data)));
    const minValue = Math.min(...(data.map(d => d.data)));
    const canvas = target.refs.canvas;
    const ctx = canvas.getContext("2d");
    const width = (options.width || 150) * 2;
    const height = (options.height || 110) * 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style = `width: ${width / 2}px; height: ${height / 2}px`;
    const rectH = 10, rectW = 20;

    // 绘制标题
    ctx.font = "30px arial";
    ctx.fillStyle = "#000";
    ctx.fillText(options.title || "标题", 0, 30);
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
        ctx.fillStyle = '#000';

        // 绘制y轴标题
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

        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = barColor;
        ctx.fillRect(_width - 20, avgHeight * data.length, 40, -avgHeight * data.length + _height)
        ctx.fill();
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
    canvas.addEventListener("mousemove", e => {
        const layX = e.layerX;
        const layY = e.layerY;
        const _data = data[Math.floor(layX * 2 / avgWidth)]
        const toolTip = target.refs.hp_chart_tooltip;
        toolTip.innerHTML = "";
        const span = document.createElement("span");
        span.className = "title"
        span.innerHTML = _data.title;
        toolTip.appendChild(span);
        const span2 = document.createElement("span");
        span2.className = "content"
        const style = `background:${barColor};display:inline-block;border-radius:50%;width:8px;height:8px;margin:0 10px;`
        span2.innerHTML = `<span style="${style}"></span>${_data.data}`;
        toolTip.appendChild(span2);
        toolTip.style = `top: ${layY}px;left: ${layX}px`;
    });
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
    canvas.style = `width: ${width / 2}px; height: ${height / 2}px`;
    const ctx = canvas.getContext("2d");
    ctx.font = "30px arial";
    ctx.fillStyle = "#000";
    ctx.fillText(options.title || "标题", 10, 30);

    // 绘制饼图
    let startAngle = 0, num = 1;
    for (const _data of _new_data) {
        ctx.beginPath();
        const color = '#'+Math.floor(Math.random()*0xffffff).toString(16);
        ctx.strokeStyle = color;
        const angle =  _data * 2 * Math.PI;
        ctx.arc(originX, originY, originX * .4, startAngle, startAngle + angle);
        startAngle += angle;
        ctx.lineWidth = options.lineWidth || 40;
        ctx.stroke();
        ctx.closePath();
        // 绘制 legend 注释
        if(options.legend) {
            ctx.font = "18px arial"
            ctx.fillStyle = color;
            ctx.fillRect(width - 130, num * 30 - 15, 20, 15)
            ctx.fillText(data[num - 1].title, width - 100, num * 30)
        }
        num ++;
    }

    canvas.addEventListener("mousemove", e => {
        console.log(e)
    })

    return canvas;
}
export function line(target, options, data) {
    if (!target.refs.canvas) return null;
    options = options || {}
    const canvas = target.refs.canvas;
    const width = (options.width || 150) * 2;
    const height = (options.height || 110) * 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style = `width: ${width / 2}px; height: ${height / 2}px`;
    return canvas;

}