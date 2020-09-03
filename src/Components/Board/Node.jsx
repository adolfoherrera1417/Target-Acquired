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
          className: props.type === "start" ? "startNode" : props.type === "end" ? "endNode" : ''
        };
    }

    render() {
        const className = this.state.className
        return (
            <div 
                id={`node-${this.state.cordinate[0]}-${this.state.cordinate[1]}`} 
                className={'node ' + className}
                onMouseDown={() => this.state.onMouseDown(this.state.cordinate[0],this.state.cordinate[1])}
                onMouseEnter={() => this.state.onMouseEnter(this.state.cordinate[0],this.state.cordinate[1])}
                onMouseUp={() => this.state.onMouseUp()}
                >
            </div>
        )
    }
}
