import { h } from './dom/h';
import { patch } from './dom/patch'
const container = document.getElementById("container");

const vnode = h('ul', {}, [
  h('li', { key: 1 }, 'a'),
  h('li', { key: 2 }, 'b'),
  h('li', { key: 3 }, 'c')
])
// const vnode = h('ul',{},'123')
console.log(vnode);
patch(container, vnode)