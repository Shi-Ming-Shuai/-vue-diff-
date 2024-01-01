export const vnode = (sel, data, text, children, elm, key) => {
  // 如果是真实dom转换为虚拟dom  进入这里
  // 判断是否有子元素 将子元素也转化为虚拟dom
  // if (children && children[0]?.tagName) {
  //   children = [...children]
  //   // 处理子节点
  //   for (let i = 0; i < children.length; i++) {
  //     const childrenElm = children[i]
  //     const sel = childrenElm.tagName.toLowerCase()
  //     const text = childrenElm.innerText
  //     children[i] = vnode(sel, {}, text, undefined, childrenElm, undefined)
  //   }
  // }
  //  添加key属性
  key = data.key
  return {
    sel, data, text, children, elm, key
  }
}