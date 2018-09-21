import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./layout.scss"

export default class LayOut extends Component {
    render() {
        return <div className="hp-layout">
        {buildPyramid(7)}
        </div>
    }
}

/**
 * @desc 构建指定层数金字塔
 * @param floor 层数 
 */
function buildPyramid(floor) {
    let result = null, total = 2 * floor - 1;
    for(let i = 0; i < floor; i ++) {
                
    }
    return result;
}