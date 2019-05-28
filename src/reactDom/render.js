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
    component.render = function () {
      return vdom.tag(props)
    }
  }
}

export const _render = (vdom, root) => {
  // const vdomNode = vdom.render ? vdom.render() : vdom
  if (typeof vdom === "string" || typeof vdom === "number") {
    root.innerText += vdom
    return
  }
  if (typeof vdom.tag === 'function') {
    const component = createComponent(vdom, vdom.attrs);
    setComponentProps(component, vdom.attrs);
    return component.base;
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
  // 将父节点 root 挂到 vdom 上，当再次渲染组件时，会用到 vdom.root
  // if (vdom.root) {
  //   vdom.root.innerText = ''
  //   vdom.root.appendChild(dom)
  //   return
  // }
  // vdom.root = root
  // 将子元素挂载到其真实 DOM 的父元素上
  root.appendChild(dom)
}

export const render = (vdom, root) => {
  if (typeof vdom.tag === 'function') {
    let component
    if (vdom.tag.prototype.render) {
      // 类定义的组件
      component = new vdom.tag(vdom.attrs)
    } else {
      // 函数定义组件
      component = vdom.tag(vdom.attrs)
    }

    _render(component, root)
    return
  }
  _render(vdom, root)
}