class Vue {
  constructor(options) {
    this.$options = options
    // 判断生命周期是否是函数，只有生命周期为函数的时候才能使用
    // 生命周期
    Object.prototype.toString.call(options.beforeCreate) === '[object Function]' && options.beforeCreate.bind(this)()
    // 初始化数据 data
    this.$data = options.data
    this.proxyData()
    // 数据劫持  存放数据对应的Watcher
    this.$watcherEvent = {}
    this.observer()
    Object.prototype.toString.call(options.created) === '[object Function]' && options.created.bind(this)()
    Object.prototype.toString.call(options.beforeMounte) === '[object Function]' && options.beforeMounte.bind(this)()
    // 获取 DOM
    this.$el = document.querySelector(options.el)
    // 模板编译
    this.compile(this.$el)
    Object.prototype.toString.call(options.mounted) === '[object Function]' && options.mounted.bind(this)()
  }
  // 数据劫持 将$data中的数据放到 Vue大对象上
  // vue大对象上的属性变化 对应$data中的数据也跟着变
  proxyData() {
    for (const key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(val) {
          console.log('proxyData');
          this.$data[key] = val
        }
      })
    }
  }
  // Observer: 这里的主要工作是递归地监听对象上的所有属性，在属性值改变的时候，触发相应的Watcher
  observer() {
    for (const key in this.$data) {
      if (Object.hasOwnProperty.call(this.$data, key)) {
        let value = this.$data[key]
        const that = this
        console.log(value, '闭包外边');
        Object.defineProperty(this.$data, key, {
          get() {
            return value
          },
          set(val) {
            value = val
            // 触发对应的Watcher
            that.$watcherEvent[key].forEach(item => {
              item.update()
            })
          }
        })
      }
    }
  }
  // 模板编译 Compile
  compile(node) {
    //  获取挂载元素下的所有节点 ， 编译
    const nodeList = node.childNodes
    nodeList.forEach(item => {
      // 当前内容是标签  将标签传过去递归
      if (item.nodeType === 1) {

        // 解析@事件 添加事件，  拿到标签上的属性找到@的事件
        if ([...item.attributes].length > 0) {
          const reg = /^@/
          const eventAttrs = [...item.attributes].filter(attrItem => {
            return reg.test(attrItem.nodeName)
          })
          // 实现添加事件
          eventAttrs.forEach(eventItem => {
            // 拿到当前元素的事件名称 和 事件对应的函数。 例如: @click = "fun"
            const evnetName = eventItem.nodeName.slice(1)
            const eventFunName = eventItem.nodeValue.trim()
            const eventFun = this.$options.methods[eventFunName]
            item.addEventListener(evnetName, eventFun.bind(this))
          })
          // item.addEventLisner()
        }
        // 处理v-model 双向绑定
        if (item.hasAttribute('v-model')) {
          // v-model绑定的元素 value 渲染为 模板层中对应的数据
          const vkey = item.getAttribute('v-model')
          if (this[vkey]) {
            item.value = this[vkey]
          }
          //实现数据双向绑定 添加 input事件  模板层对应的data数据 改为 输入框中的位置
          item.addEventListener('input', () => {
            this[vkey] = item.value
          })
        }
        // item.attributes.filter(item => {
        //   console.log(item);
        // })
        // 递归模板编译
        item.childNodes.length > 0 && this.compile(item)
      }
      // 如果是文本  直接替换文本中的 {{xxx}} 为data中的数据
      if (item.nodeType === 3) {
        // 正则修改将视图中 {{xx}} 为 模板data中的数据
        const reg = /\{\{(.*)\}\}/g
        item.textContent = item.textContent.replace(reg, (match, vmKey) => {
          vmKey = vmKey.trim()
          // Watcher 观察数据  当数据发生变化  触发observer
          if (this.$data[vmKey]) {
            const watcher = new Watcher(this, vmKey, item, 'textContent')
            this.$watcherEvent[vmKey] ? '' : this.$watcherEvent[vmKey] = []
            this.$watcherEvent[vmKey].push(watcher)
          }
          //  return  正则替换的内容
          return this.$data[vmKey]
        })
      }
    })
  }
}

// render watcher
// Observer: 这里的主要工作是递归地监听对象上的所有属性，在属性值改变的时候，触发相应的Watcher。
// Watcher: 观察者，当监听的数据值修改时，执行响应的回调函数，在Vue里面的更新模板内容。  
class Watcher {
  // vm,   Vue 实例
  // key,  data中的数据(key值)
  // node, 当前的元素节点
  // attr, TextContent
  constructor(vm, key, node, attr) {
    this.vm = vm
    this.key = key
    this.node = node
    this.attr = attr
  }
  // update  更新视图  在Vue里面的更新模板内容
  update() {
    this.node[this.attr] = this.vm.$data[this.key]
    // const reg = /\{\{(.*)\}\}/g
    // console.log(this.node[this.attr]);
    // this.node[this.attr] = this.node[this.attr].replace(reg, (match, vmKey) => {
    //   vmKey = vmKey.trim()
    //   console.log(vmKey);
    //   //  return  正则替换的内容
    //   return this.vm.$data[vmKey]
    // })
  }
}