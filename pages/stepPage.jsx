import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps, Step, Panel, GridLayout, Layout, Button } from "common"
import "./reactPage.scss"

export default class StepPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curStep: 2,
            isFinishStep: false,
        }
        this.stepNextHandler = this.stepNextHandler.bind(this)
    }

    render() {
        const { curStep, isFinishStep } = this.state;
        return <div className="hp-reactpage">
            <Panel title="基本用法" toolbar={true}>
                <p>步骤条：引导用户按照流程完成任务的导航条，当复杂任务存在先后关系，对任务进行拆解，从而简化操作。</p>
                <Steps
                    space={200}
                    active={1}
                >
                    <Step title={"Step 1"}></Step>
                    <Step title={"Step 2"}></Step>
                    <Step title={"Step 3"}></Step>
                    <Step title={"Step 4"}></Step>
                </Steps>
                <h4>带描述的步骤条</h4>
                <Steps
                    space={200}
                    active={2}
                >
                    <Step title={"Step 1"} description={"ba la ba la ... ba la ba la ..."}></Step>
                    <Step title={"Step 2"} description={"ba la ba la"}></Step>
                    <Step title={"Step 3"} description={"ba la ba la ... ba la ba la ..."}></Step>
                    <Step title={"Step 4"} description={"ba la ba la"}></Step>
                </Steps>
                <h4>带图标的步骤条</h4>
                <Steps
                    space={200}
                    active={2}
                >
                    <Step title={"Step 1"} icon={"icon-addressbook"} description={"ba la ba la ... ba la ba la ..."}></Step>
                    <Step title={"Step 2"} icon={"icon-service"} description={"ba la ba la"}></Step>
                    <Step title={"Step 3"} icon={"icon-homepage"} description={"ba la ba la ... ba la ba la ..."}></Step>
                    <Step title={"Step 4"} icon={"icon-commodity"} description={"ba la ba la"}></Step>
                </Steps>
                <h4>竖直方向步骤条</h4>
                <Steps
                    space={200}
                    active={2}
                    type="vertical"
                >
                    <Step title={"Step 1"} description={"ba la ba la ... ba la ba la ..."}></Step>
                    <Step title={"Step 2"} description={"ba la ba la"}></Step>
                    <Step title={"Step 3"} description={"ba la ba la ... ba la ba la ..."}></Step>
                    <Step title={"Step 4"} description={"ba la ba la"}></Step>
                </Steps>
            </Panel>
            <GridLayout className="mt-10">
                <Layout col={12}>
                    <Panel title="演示" toolbar={true}>
                        <Steps
                            space={200}
                            active={2}
                            active={curStep}
                            finishStatus={isFinishStep}
                        >
                            <Step title={"Step 1"} icon={"icon-addressbook"} description={"ba la ba la ... ba la ba la ..."}></Step>
                            <Step title={"Step 2"} icon={"icon-service"} description={"ba la ba la"}></Step>
                            <Step title={"Step 3"} icon={"icon-homepage"} description={"ba la ba la ... ba la ba la ..."}></Step>
                            <Step title={"Step 4"} icon={"icon-commodity"} description={"ba la ba la"}></Step>
                        </Steps>
                        <div className="mt-10">
                            <Button theme={"primary"} onClick={() => { this.stepNextHandler(0) }}>上一步</Button>
                            <Button className="ml-10" theme={"primary"} onClick={() => { this.stepNextHandler(1) }}>下一步</Button>
                        </div>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }

    /**
     * @desc 步骤条
     * @param type 0 pre 1 next
     */
    stepNextHandler(type) {
        const { curStep, isFinishStep } = this.state;
        this.setState({
            isFinishStep: type === 1 && curStep === 4 ? true : false
        });
        this.setState({
            curStep: type ?
                (
                    curStep === 4 ?
                        4 : curStep + 1
                )
                :
                (
                    curStep === 1 ?
                        1 : isFinishStep ? curStep : curStep - 1
                )
        });
    }
}