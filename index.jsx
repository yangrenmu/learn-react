const createElement = (tag, attrs, ...childs) => {
  return { tag, attrs, childs }
}

const render = (vdom, root) => {
  if (typeof vdom === "string") {
    root.innerText += vdom
    return
  }
  const dom = document.createElement(vdom.tag)
  if (vdom.attrs) {
    for (let attr in vdom.attrs) {
      const value = vdom.attrs[attr]
      setAttribute(dom, attr, value)
    }
  }
  // 遍历子节点
  vdom.childs.forEach(child => render(child, dom))
  // 将子元素挂载到其真实 DOM 的父元素上
  root.appendChild(dom)
}

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

const React = {
  createElement
}

const ReactDOM = {
  render: (vdom, root) => {
    root.innerText = ""
    render(vdom, root)
  }
}

const print = () => {
  console.log("click")
}

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById("root"))
}

setInterval(tick, 1000)
