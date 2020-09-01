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
            mouseIsPressed: false,
            startNodeState: {
                startNodeIsPressed: false,
                x: 0,
                y: 0
            },
            endNodeState: {
                pressed: false,
                x: 7,
                y: 8
            }
        }      
        
        this.handleClick = this.handleClick.bind(this)
        this.handleClearPath = this.handleClearPath.bind(this)
    }

    componentDidMount() {
        this.createBoard();
    }

    handleMouseDown = (x,y) => {
        if (this.state.startNodeState.x === x && this.state.startNodeState.y === y) {
            let {startNodeState} = this.state;
            startNodeState.startNodeIsPressed = true;
            this.setState({startNodeState});
        } else if (this.state.endNodeState.x === x && this.state.endNodeState.y === y) {
            let {endNodeState} = this.state;
            endNodeState.pressed = true;
            this.setState({endNodeState});
        } else {
            document.getElementById(`node-${x}-${y}`).className = 'node wall';
            let {matrix} = this.state;
            matrix[x][y] = "W";
            this.setState({matrix,mouseIsPressed: true});
        }
    }

    handleMouseEnter = (x,y) => {
        if (!(this.state.mouseIsPressed || this.state.startNodeState.startNodeIsPressed || this.state.endNodeState.pressed)){return;}
        let {matrix} = this.state;
        if (this.state.startNodeState.startNodeIsPressed) {
            let {startNodeState} = this.state
            document.getElementById(`node-${startNodeState.x}-${startNodeState.y}`).className = 'node';
            startNodeState.x = x;
            startNodeState.y = y;
            document.getElementById(`node-${x}-${y}`).className = 'node startNode';
            this.setState({startNodeState})
        } else if (this.state.endNodeState.pressed) {
            let {endNodeState} = this.state;
            document.getElementById(`node-${endNodeState.x}-${endNodeState.y}`).className = 'node';
            endNodeState.x = x;
            endNodeState.y = y;
            document.getElementById(`node-${x}-${y}`).className = 'node endNode';
            this.setState({endNodeState});
        } else {
            document.getElementById(`node-${x}-${y}`).className = 'node wall';
            let {matrix} = this.state
            matrix[x][y] = "W";
        }
        this.setState({matrix});
    }

    handleMouseUp = () => {
        let {startNodeState} = this.state;
        let {endNodeState} = this.state;
        startNodeState.startNodeIsPressed = false;
        endNodeState.pressed = false;
        this.setState({
            mouseIsPressed: false,
            startNodeState,
            endNodeState
        })
    }

    handleClick() {
        let {path,visitedPathInOrder} = BFSShortestPath(this.state.matrix,{x: this.state.startNodeState.x, y: this.state.startNodeState.y},{x:this.state.endNodeState.x, y: this.state.endNodeState.y});
        let {startNodeState,endNodeState} = this.state
        for(let i = 0; i < visitedPathInOrder.length; i++) {

            setTimeout(() => {
                if (!((startNodeState.x === visitedPathInOrder[i].x && startNodeState.y === visitedPathInOrder[i].y) || (endNodeState.x === visitedPathInOrder[i].x && endNodeState.y === visitedPathInOrder[i].y))) {
                    document.getElementById(`node-${visitedPathInOrder[i].x}-${visitedPathInOrder[i].y}`).className = 'node visited';
                }
            },10*i);

            if (i === visitedPathInOrder.length-1) {
                setTimeout(() => {
                for (let j = 0; j < path.length; j++) {
                    setTimeout(() => {  
                    if (!((startNodeState.x === path[j].x && startNodeState.y === path[j].y) || (endNodeState.x === path[j].x && endNodeState.y === path[j].y))) {
                        document.getElementById(`node-${path[j].x}-${path[j].y}`).className = 'node path';
                    }
                },50*j);}},10*i)
            }
        }
    }

    handleClearPath() {
        let {matrix,startNodeState,endNodeState} = this.state
        for(let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if(endNodeState.x === i && endNodeState.y === j) {
                    document.getElementById(`node-${i}-${j}`).className = 'node endNode';
                } else if (startNodeState.x === i && startNodeState.y === j) {
                    document.getElementById(`node-${i}-${j}`).className = 'node startNode';
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
        for(let i = 0; i < 20; i++) {
            let col = []
            for(let j = 0; j < 20; j++) {
                if (i === 0 && j === 0) {
                    col.push(<Node key={`${i}${j}`} 
                                    cordinate={[i,j]} 
                                    onMouseDown={(i,j) => this.handleMouseDown(i,j)}
                                    onMouseEnter={(i,j) => this.handleMouseEnter(i,j)}
                                    onMouseUp = {() => this.handleMouseUp()}
                                    start={true}/>)
                } else if (i === 7 && j === 8) {
                    col.push(<Node key={`${i}${j}`}
                                    cordinate={[i,j]}
                                    onMouseDown={(i,j) => this.handleMouseDown(i,j)}
                                    onMouseEnter={(i,j) => this.handleMouseEnter(i,j)}
                                    nMouseUp = {() => this.handleMouseUp()} 
                                    end={true}/>)
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
        for (let i = 0; i < 20;i++) {
            matrix.push(new Array(20).fill("P"))
        }
        matrix[7][8] = "T"
        matrix[0][0] = "S"

        this.setState({
            grid: row,
            matrix
        })
    }
    
    
    render() {
        return (
            <div style={{width: "650px", marginLeft:"auto", marginRight: "auto"}}>
                <Temp title={"BFS Path Animation"}/>
                {this.state.grid}
                <button onClick={this.handleClick}>View Animation</button>
                <button onClick={this.handleClearPath}>Clear Path</button>
            </div>
        )
    }
}
