const setAttribute = (dom, attr, value) => {
  if (attr === "className") {
    attr = "class"
  }
  // 处理事件
  if (/on\w+/.test(attr)) {
    attr = attr.toLowerCase()
    dom[attr] = value || ""
  } else if (attr === "style" && value) {
    if (typeof value === "string") {
      dom.style.cssText = value
    } else if (typeof value === "object") {
      for (let styleName in value) {
        dom.style[styleName] =
          typeof value[styleName] === "number"
            ? value[styleName] + "px"
            : value[styleName]
      }
    }
  } else {
    // 其他属性
    dom.setAttribute(attr, value)
  }
}

// 创建组件
const createComponent = (vdom, props) => {
  let component
  // 类定义的组件，直接返回实例
  if (vdom.tag.prototype && vdom.tag.prototype.render) {
    component = new vdom.tag(props)
  } else {
    // 函数定义的组件，添加 render 方法，为了获取函数中 jsx 转化的虚拟 dom
    component = new vdom.tag(props)
    component.render = function () {
      return vdom.tag(props)
    }
  }
  return component
}

export const renderComponent = (component) => {
  if (component.base && component.shouldComponentUpdate) {
    const bool = component.shouldComponentUpdate(component.props, component.state)
    if (!bool && bool !== undefined) {
      return false
    }
  }
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }
  const rendered = component.render()
  const base = _render(rendered)
  if (component.base && component.componentDidUpdate) {
    component.componentDidUpdate()
  } else if (component && component.componentDidMount) {
    component.componentDidMount()
  }
  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base)
  }
  component.base = base
}

const setComponentProps = (component, props) => {
  if (!component.base && component.componentWillMount) {
    component.componentWillMount()
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }
  component.props = props
  renderComponent(component)
}

export const _render = (vdom) => {
  if (typeof vdom === "string" || typeof vdom === "number") {
    const textNode = document.createTextNode(vdom)
    return textNode
  }
  if (typeof vdom.tag === 'function') {
    const component = createComponent(vdom, vdom.attrs)
    setComponentProps(component, vdom.attrs)
    return component.base
  }
  const dom = document.createElement(vdom.tag)
  if (vdom.attrs) {
    for (let attr in vdom.attrs) {
      const value = vdom.attrs[attr]
      setAttribute(dom, attr, value)
    }
  }
  // 遍历子节点, 
  vdom.childs && vdom.childs.forEach(child => render(child, dom))
  return dom
}

export const render = (vdom, container) => {
  return container.appendChild(_render(vdom))
}
