// I want to create a BFS visiualizer.
// Currently having a problem with notifying which node i have visited
// iterating thrugh my matrix of node components. I need to say hey you at [1][1] i visited you turn blue

import React, { Component } from 'react'

import './Node.css'
const startStyle = {backgroundColor: "green"}
const endStyle = {backgroundColor: "red"}

export default class Node extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          cordinate: props.cordinate,
          start: props.start ? true : false,
          end: props.end ? true : false,
          visited: props.visited
        };
    }

    render() {
        let cell;
        if (this.state.start) {
            cell = <div style={startStyle}><p>{this.state.cordinate[0]},{this.state.cordinate[1]}</p></div>
        } else if(this.state.end) {
            cell = <div style={endStyle}><p>{this.state.cordinate[0]},{this.state.cordinate[1]}</p></div>
        } else {
            cell = <div><p>{this.state.cordinate[0]},{this.state.cordinate[1]}</p></div>
        }

        return (
            <div id={`node-${this.state.cordinate[0]}-${this.state.cordinate[1]}`} className="node">
                {cell}
            </div>
        )
    }
}
