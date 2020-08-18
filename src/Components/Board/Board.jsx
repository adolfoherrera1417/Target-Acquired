import React, { Component } from 'react'
import Node from './Node'
import Temp from './Temp'
import {BFSShortestPath} from '../../Algorithms/BFS.js'


const walls = [[0,6],[1,6],[2,6],[3,6],[4,6],[5,5],[6,5],[7,4]]


export default class Board extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: [],
        }        
    }

    componentDidMount() {
        this.createBoard();
    }

    handleClick() {
        // I want to create a function that will send the cordinate of
        // the node we are at to the state of the child and update if i went
        // to your node
        let {path,visitedPathInOrder} = BFSShortestPath()

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
                    col.push(<Node key={`${i}${j}`} cordinate={[i,j]}/>)
                }
            }
            row.push(col);
        }

        this.setState({
            grid: row
        },() => {
            for(let i = 0; i < walls.length; i++) {
                document.getElementById(`node-${walls[i][0]}-${walls[i][1]}`).className = 'node wall';
            }
        })
    }
    
    
    render() {
        return (
            <div style={{width: "460px"}}>
                <Temp title={"BFS Path Animation"}/>
                {this.state.grid}
                <button onClick={this.handleClick}>View Animation</button>
            </div>
        )
    }
}
