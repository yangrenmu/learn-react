import React from "./react"
import ReactDom from "./reactDom"

const World = props => {
  return (
    <h1>
      world!<p>{props.world}</p>
    </h1>
  )
}

class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  addCount() {
    const { count } = this.state
    this.setState({
      count: count + 1
    })
  }
  render() {
    return (
      <div ha="lou">
        hello
        <World world="function props" />
        <span>{this.props.initProps}</span>
        <div>{this.state.count}</div>
        <button onClick={this.addCount.bind(this)}> + </button>
      </div>
    )
  }
}

ReactDom.render(
  <Hello initProps="this is props" />,
  document.getElementById("root")
)
