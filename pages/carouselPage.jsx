import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatArrayObj, GridLayout, Layout, Panel, Carousel } from "common";
import "./carouselPage.scss"

export default class CarouselPage extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(formatArrayObj([{a: 1, b: 1}, {a: 2, b: 2}], {a: "name", b: "type"}))
    }
    render() {
        return <div className="hp-carouselPage">
            <GridLayout>
                <Layout col={12}>
                        <Panel className="mt-10" title="跑马灯" toolbar={true}>
                            <p className="introduction">跑马灯：轮询播放展示，常用语展示空间不足的情况下，对一组图片或卡片等进行切换展示。</p>
                        </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10"
                        title="基本用法" toolbar={true}>
                        <p>最常用的基本用法。</p>
                        <Carousel>
                            <div className="hp-carousel-demo_div"><h1>1</h1></div>
                            <div className="hp-carousel-demo_div"><h1>2</h1></div>
                            <div className="hp-carousel-demo_div"><h1>3</h1></div>
                            <div className="hp-carousel-demo_div"><h1>4</h1></div>
                        </Carousel>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10"
                        style={{ width: "calc(100% - 5px)", marginLeft: "5px" }}
                        title="垂直轮播" toolbar={true}>
                        <p>垂直轮播：垂直的轮播器。</p>
                        <Carousel vertical={true}>
                            <div className="hp-carousel-demo_div"><h1>1</h1></div>
                            <div className="hp-carousel-demo_div"><h1>2</h1></div>
                            <div className="hp-carousel-demo_div"><h1>3</h1></div>
                            <div className="hp-carousel-demo_div"><h1>4</h1></div>
                        </Carousel>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10"
                        title="自动轮播" toolbar={true}>
                        <p>自动轮播：自动进行轮询展示，通过autoPlay设置，并通过duration设置每张展示的时间</p>
                        <Carousel autoPlay={true}>
                            <div className="hp-carousel-demo_div"><h1>1</h1></div>
                            <div className="hp-carousel-demo_div"><h1>2</h1></div>
                            <div className="hp-carousel-demo_div"><h1>3</h1></div>
                            <div className="hp-carousel-demo_div"><h1>4</h1></div>
                        </Carousel>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10"
                        style={{ width: "calc(100% - 5px)", marginLeft: "5px" }}
                        title="渐显" toolbar={true}>
                        <p>渐显：内容切换效果为渐显。</p>
                        <Carousel className="mt-35" effect={"fade"}>
                            <div className="hp-carousel-demo_div"><h1>1</h1></div>
                            <div className="hp-carousel-demo_div"><h1>2</h1></div>
                            <div className="hp-carousel-demo_div"><h1>3</h1></div>
                            <div className="hp-carousel-demo_div"><h1>4</h1></div>
                        </Carousel>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}