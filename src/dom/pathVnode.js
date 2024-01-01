import { createElement } from "./createElement";
import { updateChildren } from "./updateChildren";

export const patchVnode = (oldVnode, newVnode) => {
  const oldVnodeElm = oldVnode.elm

  // 1.新节点有没有children
  if (newVnode.children !== undefined) {

    // 1.1 diff 算法核心 新节点有children  旧节点有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 根据key 对比新老节点 更新dom 
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      //  1.2 新节点有children  旧节点没有children
      // 清空旧节点内容   将新节点创建为真实dom 追加上去
      oldVnodeElm.innerHTML = ''
      if (newVnode.children.length > 0) {
        // 新节点 children 有内容  不为空，创建真实dom
        newVnode.children.forEach(item => {
          const childrenDom = createElement(item)
          oldVnodeElm.appendChild(childrenDom)
        })
      }
    }
  } else {
    // 1.3新节点没有children，旧节点没有children
    if (newVnode.text !== oldVnode.text) {
      // 新节点内容跟旧节点内容不一样 替换（内容一样的话什么都不做）
      oldVnodeElm.textContent = newVnode.text
    }
  }
}