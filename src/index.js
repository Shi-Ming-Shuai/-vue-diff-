import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
]);

const container = document.getElementById("container");

const vnode = h('ul', {}, [
  h('li', {key:1}, 'a'),
  h('li', {key:2}, 'b'),
  h('li', {key:3}, 'c')
])
patch(container, vnode)

const vnode2 = h('div', {}, [
  h('li', {key:2}, 'b'),
  h('li', {key:1}, 'a'),
  h('li', {key:3}, 'c')
])
btn.addEventListener('click', () => {
  patch(vnode, vnode2)
})