import React, { Component } from 'react'
import Node from './Node'
import Temp from './Temp'
import {BFSShortestPath} from '../../Algorithms/BFS.js'

export default class Board extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            matrix: [],
            mouseIsPressed: false
        }      
        
        this.handleClick = this.handleClick.bind(this)
        this.handleCleanBoard = this.handleCleanBoard.bind(this)
    }

    componentDidMount() {
        this.createBoard();
    }

    handleMouseDown = (x,y) => {
        document.getElementById(`node-${x}-${y}`).className = 'node wall';
        let {matrix} = this.state
        matrix[x][y] = "W";
        this.setState({matrix,mouseIsPressed: true});
    }

    handleMouseEnter = (x,y) => {
        if (!this.state.mouseIsPressed ){return;}
        document.getElementById(`node-${x}-${y}`).className = 'node wall';
        let {matrix} = this.state
        matrix[x][y] = "W";
        this.setState({matrix});
    }

    handleMouseUp = () => {
        this.setState({
            mouseIsPressed: false
        })
    }

    handleClick() {
        let {path,visitedPathInOrder} = BFSShortestPath(this.state.matrix)

        for(let i = 0; i < visitedPathInOrder.length; i++) {
            setTimeout(() => {
                document.getElementById(`node-${visitedPathInOrder[i].x}-${visitedPathInOrder[i].y}`).className = 'node visited';
            },10*i);

            if (i === visitedPathInOrder.length-1) {
                setTimeout(() => {
                for (let j = 0; j < path.length; j++) {
                    setTimeout(() => {
                    document.getElementById(`node-${path[j].x}-${path[j].y}`).className = 'node path';
                },50*j);}},10*i)
            }
        }
    }

    handleCleanBoard() {
        let {matrix} = this.state
        for(let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if((i === 7) && (j === 8)) {
                    continue 
                } else {
                    matrix[i][j] = "P"
                    document.getElementById(`node-${i}-${j}`).className = 'node';
                }
            }
        }
        this.setState({matrix})
    }

    createBoard() {
        let row = [];
        for(let i = 0; i < 10; i++) {
            let col = []
            for(let j = 0; j < 10; j++) {
                if (i === 0 && j === 0) {
                    col.push(<Node key={`${i}${j}`} cordinate={[i,j]} start={true}/>)
                } else if (i === 7 && j === 8) {
                    col.push(<Node key={`${i}${j}`} cordinate={[i,j]} end={true}/>)
                } else {
                    col.push(<Node key={`${i}${j}`} 
                                cordinate={[i,j]} 
                                onMouseDown={(i,j) => this.handleMouseDown(i,j)}
                                onMouseEnter={(i,j) => this.handleMouseEnter(i,j)}
                                onMouseUp = {() => this.handleMouseUp()}
                                />)
                }
            }
            row.push(col);
        }

        let matrix = []
        for (let i = 0; i < 10;i++) {
            matrix.push(new Array(10).fill("P"))
        }
        matrix[7][8] = "T"

        this.setState({
            grid: row,
            matrix
        })
    }
    
    
    render() {
        return (
            <div style={{width: "460px", marginLeft:"auto", marginRight: "auto"}}>
                <Temp title={"BFS Path Animation"}/>
                {this.state.grid}
                <button onClick={this.handleClick}>View Animation</button>
                <button onClick={this.handleCleanBoard}>Clear Board</button>
            </div>
        )
    }
}
