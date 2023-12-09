import { h } from './h'
// oldVnode 为旧虚拟节点 (如果是真实元素  那么将它转换为虚拟节点 然后进行比较)
// newVnode 为当前新的虚拟节点
export const patch = (oldVnode, newVnode) => {
  // 判断oldVnode是否为真实元素,如果是真实元素 转换为 虚拟节点
  if (!oldVnode.sel) {
    // oldVnode = 
  }
  // 比较oldVnode 和 newVnode
  // 比较以后创建真实dom元素  插入到变化的元素前面
}