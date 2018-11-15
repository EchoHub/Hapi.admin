import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, GridLayout, Layout } from "common";
import "./layout.scss"

export default class LayOut extends Component {
    render() {
        return <div className="hp-layoutpage">
            <Panel title="栅格布局" toolbar={true}>
                <p className="introduction">在12栅格系统的基础上，以行列的形式对页面进行信息区域划分，通过GridLayOut创建栅格盒子，并通过LayOut创建区块，以保证整个页面清晰地进行栅格布局。</p>
                <GridLayout theme="default">
                    <Layout col={12}>100%</Layout>
                    <Layout col={6}>50%</Layout>
                    <Layout col={6}>50%</Layout>
                    <Layout col={4}>33.3%</Layout>
                    <Layout col={4}>33.3%</Layout>
                    <Layout col={4}>33.3%</Layout>
                    <Layout col={3}>25%</Layout>
                    <Layout col={3}>25%</Layout>
                    <Layout col={3}>25%</Layout>
                    <Layout col={3}>25%</Layout>
                    <Layout col={6}>50%</Layout>
                    <Layout col={3}>33.3%</Layout>
                    <Layout col={3}>33.3%</Layout>
                </GridLayout>
            </Panel>
            <Panel className="mt-10" title="Flex栅格布局" toolbar={true}>
                <p className="introduction">本栅格系统支持flex布局，通过定义theme主题为flex，系统切换为flex模式,flex的常用功能均能支持。</p>
                <GridLayout theme="flex" justify="center">
                    <Layout col={3}>center</Layout>
                    <Layout col={3}>center</Layout>
                    <Layout col={3}>center</Layout>
                </GridLayout>
                <GridLayout theme="flex" justify="flex-start">
                    <Layout col={3}>flex-start</Layout>
                    <Layout col={3}>flex-start</Layout>
                    <Layout col={3}>flex-start</Layout>
                </GridLayout>
                <GridLayout theme="flex" justify="flex-end">
                    <Layout col={3}>flex-end</Layout>
                    <Layout col={3}>flex-end</Layout>
                    <Layout col={3}>flex-end</Layout>
                </GridLayout>
                <GridLayout theme="flex" justify="space-around">
                    <Layout col={3}>space-around</Layout>
                    <Layout col={3}>space-around</Layout>
                    <Layout col={3}>space-around</Layout>
                </GridLayout>
                <GridLayout theme="flex" justify="space-between">
                    <Layout col={3}>space-between</Layout>
                    <Layout col={3}>space-between</Layout>
                    <Layout col={3}>space-between</Layout>
                </GridLayout>
            </Panel>
        </div>
    }
}