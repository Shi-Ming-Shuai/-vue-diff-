// 根据key 对比新老节点
/**
 * 双指针
 * 旧前和新前  命中：旧前和新前的指针++
 * 旧后和新后  命中：旧后和新后的指针--
 * 旧前和新后  命中：旧前指针++，新后指针--
 * 旧后和新前  命中：旧后指针--，新前指针++
 * 以上都不是 查找  
 * 循环完毕还有剩余项 如果旧节点先循环完毕 说明还有剩余项需要添加
 * 如果新节点先循环完毕，并且老节点还有剩余节点，说明他们是要被删除的节点
 */
import { patchVnode } from "./pathVnode";
export const updateChildren = (parentElm, oldChildren, newChildren) => {
  console.log(parentElm, oldChildren, newChildren);
  // 双指针
  let oldStartIdx = 0     //旧前的指针
  let oldEndIdx = oldChildren.length - 1    //旧后的指针
  let newStartIdx = 0     //新前的指针
  let newEndIdx = newChildren.length - 1    //新后的指针
  // 指针指向的虚拟节点
  let oldStartVnode = oldChildren[oldStartIdx]
  let oldEndVnode = oldChildren[oldEndIdx]
  let newStartVnode = newChildren[newStartIdx]
  let newEndVnode = newChildren[newEndIdx]
  // console.log(1);
  // 比较两个节点的key是否相同
  const sameVnodeKey = (oldVnodeKey, newVnodeKey) => {
    console.log(`旧的key:${oldVnodeKey.key}与 新的key:${newVnodeKey.key}`);
    return oldVnodeKey.key === newVnodeKey.key
  }
  // 循环比较新老节点
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    debugger
    // 前四种情况如果旧节点 指针指向undefined的时候 让指针++
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIdx]
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIdx]
    }
    else if (sameVnodeKey(oldStartVnode, newStartVnode)) {
      // oldStartIdx++
      // 旧前和新前  命中：递归比较两个内容旧前和新前的指针++
      patchVnode(oldStartVnode, newStartVnode)
      // elm用于移动位置 将新节点的elm指向旧节点elm
      if (newStartVnode) newStartVnode.elm = oldStartVnode?.elm
      oldStartVnode = oldChildren[++oldStartIdx]
      newStartVnode = newChildren[++newStartIdx]
      console.log('旧前新前命中');
    } else if (sameVnodeKey(oldEndVnode, newEndVnode)) {
      // 旧后和新后  命中：旧后和新后的指针--
      patchVnode(oldEndVnode, newEndVnode)
      // elm用于移动位置 将新节点的elm指向旧节点elm
      if (newEndVnode) newEndVnode.elm = oldEndVnode?.elm
      oldEndVnode = oldChildren[--oldEndIdx]
      newEndVnode = newChildren[--newEndIdx]
      console.log('旧后和新后命中');

    } else if (sameVnodeKey(oldStartVnode, newEndVnode)) {
      // 旧前和新后  命中：旧前指针++，新后指针--
      patchVnode(oldStartVnode, newEndVnode)
      if (newEndVnode) newEndVnode.elm = oldStartVnode?.elm
      // 移动位置 将新后节点插入到旧后节点的下一个节点之前(旧后节点是会变化的)
      parentElm.insertBefore(newEndVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldChildren[++oldStartIdx]
      newEndVnode = newChildren[--newEndIdx]
      console.log('旧前和新后  命中');

    } else if (sameVnodeKey(oldEndVnode, newStartVnode)) {
      // 旧后和新前  命中：旧后指针--，新前指针++
      patchVnode(oldEndVnode, newStartVnode)
      if (newStartVnode) newStartVnode.elm = oldEndVnode?.elm
      parentElm.insertBefore(newStartVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldChildren[--oldEndIdx]
      newStartVnode = newChildren[++newStartIdx]
      console.log('旧后和新前  命中：');

    } else {
      // 以上都不是 查找 
      // 根据旧节点创建映射表用来查找。 新节点从映射表中查找，如果找到根据映射表拿到下标。将旧节点对应下标的节点移动位置，并且将旧节点对应下标设置为undefined
      // 前四种情况如果旧节点 指针指向undefined的时候 让指针++
      const keyMap = {}
      for (let i = 0; i < oldChildren.length; i++) {
        let key = oldChildren[i]?.key
        if (key) keyMap[key] = i
      }
      // 拿到新节点的头，从映射表中查找是否存在
      const idxInOld = keyMap[newStartVnode.key]
      // 判断是否存在映射表中，存在：移动位置，不存在：创建元素放到旧节点之前
      if (idxInOld) {
        // 存在映射表中
        const moveElm = oldChildren[idxInOld]
        patchVnode(moveElm, newStartVnode)
        parentElm.insertBefore(moveElm.elm, oldStartVnode.elm)
        oldChildren[idxInOld] = undefined
        newStartVnode = newChildren[++newStartIdx]
      } else {
        // 不存在映射表中
      }
      console.log(keyMap);
      console.log('以上都不是 查找 ');
    }
  }
}