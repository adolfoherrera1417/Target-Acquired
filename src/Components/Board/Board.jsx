import React, { Component } from 'react'
import Node from './Node'
import {BFSShortestPath} from '../../Algorithms/BFS.js'
import {AstarShortestPath} from '../../Algorithms/Astar.js'

//https://www.pinterest.com/pin/122934264800644434/visual-search/?cropSource=6&h=378&w=346&x=10&y=10
const ironMan = [
    {
        className: 'iron-man-red',
        node: [[2,15],[2,16],[2,17],[3,15],[3,16],[3,17],[4,16],[5,12],[5,20],[6,12],[6,20]]
    },
    {
        className: 'iron-man-yellow',
        node: [[3,13],[3,14],[3,18],[3,19],[4,12],[4,13],[4,14],[4,15],[4,17],[4,18],[4,19],[4,20],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],[5,19],[6,15],[6,16],[6,17],[8,12],[8,13],[8,14],[8,15],[8,16],[8,17],[8,18],[8,19],[8,20],[7,12],[7,20],[9,13],[9,14],[9,15],[9,16],[9,17],[9,18],[9,19],[10,14],[10,15],[10,16],[10,17],[10,18],[11,14],[11,18]]
    },
    {
        className: 'iron-man-blue',
        node: [[7,13],[7,14],[7,15],[7,17],[7,18],[7,19]]
    }
]

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
            },
            path: [],
            visitedPathInOrder: []
        }      
        
        this.animatePath = this.animatePath.bind(this)
        this.handleClearPath = this.handleClearPath.bind(this)
        this.generateIronMan = this.generateIronMan.bind(this)
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

    animatePath(index) {
        // let {path,visitedPathInOrder} = BFSShortestPath(this.state.matrix,{x: this.state.startNodeState.x, y: this.state.startNodeState.y},{x:this.state.endNodeState.x, y: this.state.endNodeState.y});
        
        //A* ONLY
        let tempmatrix = [];
        for (let i = 0; i < 20;i++) {
            tempmatrix.push(new Array(20).fill("E"))
        }
        let {path,visitedPathInOrder} = AstarShortestPath(tempmatrix,{x:this.state.endNodeState.x, y:this.state.endNodeState.y});
        // A* ONLY


        let {startNodeState,endNodeState} = this.state
        this.setState({path,visitedPathInOrder})
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

    clearCordinate(cordinate) {
        let {startNodeState, endNodeState} = this.state
        if(endNodeState.x === cordinate.x && endNodeState.y === cordinate.y) {
            document.getElementById(`node-${cordinate.x}-${cordinate.y}`).className = 'node endNode';
        } else if (startNodeState.x === cordinate.x && startNodeState.y === cordinate.y) {
            document.getElementById(`node-${cordinate.x}-${cordinate.y}`).className = 'node startNode';
        } else {
            // matrix[cordinate.x][cordinate.y] = "P"
            document.getElementById(`node-${cordinate.x}-${cordinate.y}`).className = 'node';
        }
    }

    handleClearPath(index) {
        if (index === 0) {
            //Clear Path Only
            let {path, visitedPathInOrder} = this.state;
            path.forEach(cordinate => {this.clearCordinate(cordinate)})
            visitedPathInOrder.forEach(cordinate => {this.clearCordinate(cordinate)})
        } else if(index === 1) {
            for(let i = 0; i < 36; i++) {
                for (let j = 0; j < 36; j++) {
                    this.clearCordinate({x:i,y:j});
                }
            }
        } else if(index === 3) {
            console.log("Hello WOrld")
            this.generateIronMan();
        }
    }

    createBoard() {
        let row = [];
        for(let i = 0; i < 36; i++) {
            let col = [];
            for(let j = 0; j < 36; j++) {
                const nodeType = (i === 0 && j === 0) ? "start" : (i === 7 && j === 8) ? "end" : "regular";
                col.push(<Node key={`${i}${j}`} 
                                cordinate={[i,j]} 
                                onMouseDown={(i,j) => this.handleMouseDown(i,j)}
                                onMouseEnter={(i,j) => this.handleMouseEnter(i,j)}
                                onMouseUp = {() => this.handleMouseUp()}
                                type={nodeType}/>);
            }
            row.push(col);
        }
        // Create backend grid
        let matrix = []
        for (let i = 0; i < 36;i++) {
            matrix.push(new Array(36).fill("P"))
        }

        this.setState({
            grid: row,
            matrix
        })
    }


    generateIronMan() {
        ironMan.forEach((pixel) => {
            let pixelCount = pixel.node.length;
            for (let i = 0; i < pixelCount; i++) {
                document.getElementById(`node-${pixel.node[i][0]}-${pixel.node[i][1]}`).className = `node ${pixel.className}`;
            }
        })
    }
    
    render() {
        return (
            <div style={{width: "900px", marginLeft:"auto", marginRight: "auto"}}>
                {this.state.grid}
                <button onClick={this.animatePath}>View Animation</button>
                <button onClick={this.handleClearPath}>Clear Path</button>
                <button onClick={this.generateIronMan}>Generate Iron Man</button>
            </div>
        )
    }
}
