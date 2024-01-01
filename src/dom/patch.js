import { vnode } from "./vnode";
import { createElement } from "./createElement";
import { patchVnode } from "./pathVnode";
// oldVnode 为旧虚拟dom (如果是真实元素  那么将它转换为虚拟dom 然后进行比较)
// newVnode 为当前新的虚拟dom
export const patch = (oldVnode, newVnode) => {
  // 判断oldVnode是否为真实元素,如果是真实元素 转换为 虚拟dom
  if (!oldVnode.sel) {
    const sel = oldVnode.tagName.toLowerCase()
    const text = oldVnode.innerText
    const childrens = oldVnode.children.length > 0 ? oldVnode.children : undefined
    oldVnode = vnode(sel, {}, text, childrens, oldVnode, undefined)
  }

  // 比较oldVnode 和 newVnode
  if (oldVnode.sel === newVnode.sel) {
    // 情况二：是同一个标签 进入pathVnode里进行比较
    patchVnode(oldVnode, newVnode)
  } else {
    // 情况一： 旧节点跟新节点的 元素不同。直接替换 比较以后创建真实dom元素  插入到变化的元素前面
    // 创建dom元素 
    const newVnodeElm = createElement(newVnode)
    const oldVnodeElm = oldVnode.elm
    oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}