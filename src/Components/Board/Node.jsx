// I want to create a BFS visiualizer.
// Currently having a problem with notifying which node i have visited
// iterating thrugh my matrix of node components. I need to say hey you at [1][1] i visited you turn blue

import React, { Component } from 'react'

import './Node.css'

export default class Node extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          cordinate: props.cordinate,
          start: props.start ? true : false,
          end: props.end ? true : false,
          visited: props.visited,
          onMouseDown: this.props.onMouseDown,
          onMouseEnter: this.props.onMouseEnter,
          onMouseUp: this.props.onMouseUp,
        };
    }

    render() {
        const className = this.state.start ? "startNode" : this.state.end ? "endNode" : ' ';
        return (
            <div 
                id={`node-${this.state.cordinate[0]}-${this.state.cordinate[1]}`} 
                className={'node ' + className}
                onMouseDown={() => this.state.onMouseDown(this.state.cordinate[0],this.state.cordinate[1])}
                onMouseEnter={() => this.state.onMouseEnter(this.state.cordinate[0],this.state.cordinate[1])}
                onMouseUp={() => this.state.onMouseUp()}
                >
                <p>{`${this.state.cordinate[0]},${this.state.cordinate[1]}`}</p>
            </div>
        )
    }
}
