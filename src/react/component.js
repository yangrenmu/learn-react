import { renderComponent } from '../reactDom/render'
function Component(props) {
  this.props = props
  this.state = {}
}
Component.prototype.setState = function (updateState) {
  this.state = Object.assign({}, this.state, updateState)
  renderComponent(this)
}
export default Component