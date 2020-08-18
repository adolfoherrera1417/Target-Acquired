import React, { Component } from 'react'

export default class Temp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title
        }
    }

    handleChange = e => {
        this.setState({
            title: "Controlled Child"
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state)
            }
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.title}</p>
            </div>
        )
    }
}
