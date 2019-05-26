import { render } from './render'
export default {
  render: (vdom, root) => {
    root.innerText = ""
    render(vdom, root)
  }
}