import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import parseComponents from './parse'

export default {
  name: 'VueRemark',
  functional: true,
  render (h, context) {
    const [ slot ] = context.slots().default
    const components = {}

    const createElement = (tag, attrs, children) => {
      const isComponent = tag in components
      const key = isComponent ? `${tag}-${attrs.value}` : undefined
      const vnode = h(tag, { attrs, key }, children)
      if (!isComponent || vnode.componentOptions) return vnode
    }

    const handlers = {
      // convert component nodes to HAST
      component (toHast, node) {
        const { component, value } = node
        components[component] = true
        return toHast(node, component, { value })
      }
    }

    return unified()
      .use(markdown)
      .use(context.props.plugins)
      .use(parseComponents)
      .use(remark2rehype, { handlers })
      .use(rehype2react, { createElement, prefix: false })
      .processSync(slot.text).contents
  }
}