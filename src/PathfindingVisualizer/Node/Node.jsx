import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component {
    render() {
        console.log(this.props.children)

        const {
            row, 
            col,
            onMouseDown,
            onMouseEnter,
            onMouseLeave,
            onMouseUp
        } = this.props
        
        // check if node is the start or finish node
        const extraClassName = this.props.isStart 
        ? 'start-node' 
        : this.props.isFinish
        ? 'finish-node'
        : ''

        return <div 
            id={`node-${row}-${col}`} 
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row,col)}
            onMouseEnter={() => onMouseEnter(row,col)}
            onMouseLeave={() => onMouseLeave(row, col)}
            onMouseUp={() => onMouseUp(row, col)}>
            {this.props.children}
            </div>
    }
}
