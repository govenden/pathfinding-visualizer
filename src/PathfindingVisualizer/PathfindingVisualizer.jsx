import React, {Component} from 'react';
// import Grid from './Grid/Grid'
import Node from './Node/Node'
import StartNode from './Node/StartNode'
import './PathfindingVisualizer.css';


const NUM_ROWS = 20
const NUM_COLS = 30
const START_NODE_ROW = Math.floor(NUM_ROWS / 2)
const START_NODE_COL = 2
const FINISH_NODE_ROW = Math.floor(NUM_ROWS / 2)
const FINISH_NODE_COL = NUM_COLS - 2

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            mouseIsPressed: false,
            startNodeRow: START_NODE_ROW,
            startNodeCol: START_NODE_COL
        }
    }

    componentDidMount() {
        let grid = createGrid()
        this.setState({grid})
    }

    handleMouseDown = (row, col) => {
        this.setState({mouseIsPressed: true})
    }

    handleMouseEnter = (row, col) => {
        if (!this.state.mouseIsPressed) {
            return
        }

        document.getElementById(`node-${row}-${col}`).className = "node start-node"
    }
    
    handleMouseLeave = (row, col) => {
        if (!this.state.mouseIsPressed) {
            return
        }
        
        document.getElementById(`node-${row}-${col}`).className = "node"
    }
    
    handleMouseUp = (row, col) => {
        const {grid, startNodeRow, startNodeCol} = this.state

        const newGrid = grid.slice();
        const oldStartNode = newGrid[startNodeRow][startNodeCol]
        const updatedOldStartNode = {
            ...oldStartNode,
            isStart: false
        }
        const newStartNode = newGrid[row][col];
        const updatedNewStartNode = {
            ...newStartNode,
            isStart: true,
        };
        newGrid[row][col] = updatedNewStartNode;
        newGrid[startNodeRow][startNodeCol] = updatedOldStartNode

        this.setState({
            mouseIsPressed: false, 
            grid: newGrid,
            startNodeRow: row,
            startNodeCol: col
        })
    }

    render() {
        const {grid} = this.state

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
                                        onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}>
                                            <StartNode/>
                                        </Node>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const createGrid = () => {
    const grid = []
        for (let row = 0; row < NUM_ROWS; row++) {
            const curRow = [];
            for (let col = 0; col < NUM_COLS; col++) {
                curRow.push(createNode(row, col))
            }
            grid.push(curRow)
        }
    return grid
}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
    }
}


