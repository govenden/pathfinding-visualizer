import React, { Component } from 'react';
import './Grid.css';
import Node from '../Node/Node'

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mouseIsPressed: false
        }
    }

    handleMouseDown = (row, col) => {
        this.setState({mouseIsPressed: true})
    }

    handleMouseUp = (row, col) => {
        this.setState({mouseIsPressed: false})
    }

    handleMouseEnter = (row, col) => {
        if (!this.state.mouseIsPressed) {
            return
        }

        const enteredNode = document.getElementById(`node-${row}-${col}`)
        enteredNode.className = 'node start-node'
    }
    
    handleMouseLeave = (row, col) => {
        if (!this.state.mouseIsPressed) {
            return
        }
    
        const nodeLeft = document.getElementById(`node-${row}-${col}`)
        nodeLeft.className = "node"
    }


    render() {
        const {grid} = this.props

        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isStart, isFinish} = node
                                return (
                                    <Node
                                        key={nodeIdx}
                                        row={row}
                                        col={col}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}></Node>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

// on mouse down --> press button over element
// enter --> pointer is moved onto an element
// leave --> pointer is moved out of an element
// up --> releases button over an element