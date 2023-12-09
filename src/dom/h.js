import { vnode } from './vnode';

// 生成虚拟节点
export const h = (sel, data, params) => {
  // 判断有没有子元素 没有子元素 虚拟节点中的children 为 undifine
  if (Object.prototype.toString.call(params) === '[object String]') {
    return vnode(sel, data, params, undefined, undefined, undefined);
    
  } else if (Array.isArray(params)) {  
    // 有子元素 虚拟节点中的children 为 数组 text为 undifine

    return vnode(sel, data, undefined, params, undefined, undefined);
  }
};
