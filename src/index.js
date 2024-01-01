import { h } from './dom/h';
import { patch } from './dom/patch'
const container = document.getElementById("container");

//  1.3新节点没有children，旧节点没有children
// const vnode = h('div', {}, '123')
// const vnode2 = h('div', {}, '324')
//  1.1新节点有children  旧节点没有children
// const vnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c')
// ])
const vnode = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'), 
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'e' }, 'e')

])

const vnode2 = h('ul', {}, [
  // h('li', { key: 'f' }, 'f'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'd' }, 'd')
])
// 1.1新节点有children  旧节点有children
// const vnode = h('ul', {}, [
//   h('li', {}, 'a'),
//   h('li', {}, 'b'),
//   h('li', {}, 'c')
// ])
// const vnode2 = h('ul', {}, [
//   h('li', {}, 'b'),
//   h('li', {}, 'a'),
//   h('li', {}, 'c')
// ])
// const vnode = h('ul',{},'123')
// console.log(vnode); 
patch(container, vnode)
btn.addEventListener('click', () => {
  // 获取body下第一个元素   
  // const oldVnode = document.body.firstElementChild
  // patch(oldVnode, vnode2)
  patch(vnode, vnode2)
})
