import React from "./react"
import ReactDom from "./reactDom"

class World extends React.Component {
  render() {
    return <div>{this.props.count}</div>
  }
}
class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentWillMount() {
    console.log("componentWillMount")
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState)
  }
  componentWillUpdate() {
    console.log("componentWillUpdate")
  }
  componentDidUpdate() {
    console.log("componentDidUpdate")
  }
  addCount() {
    const { count } = this.state
    this.setState({
      count: count + 1
    })
  }
  render() {
    console.log("render")
    return (
      <div ha="lou">
        <World count={this.state.count} />
        <button onClick={this.addCount.bind(this)}> + </button>
      </div>
    )
  }
}

ReactDom.render(<Hello />, document.getElementById("root"))
