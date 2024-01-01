export const createElement = (vnode) => {
  const dom = document.createElement(vnode.sel)
  if (vnode.text) {
    dom.textContent = vnode.text
  }
  // 如果存在子元素 递归创建 然后追加到 dom 上
  if (vnode.children && vnode.children.length > 0) {
    vnode.children.forEach(item => {
      dom.appendChild(createElement(item))
    })
  }
  // 设置虚拟dom的elm属性 指向真实dom节点
  vnode.elm = dom
  return dom
}