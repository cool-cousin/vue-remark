import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import parseComponents from './parse'

const hyphenateRE = /\B([A-Z])/g
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

const normalizeKeys = components => {
  const normalized = {}
  for (const key in components) normalized[hyphenate(key)] = components[key]
  return normalized
}

// convert component nodes to HAST
const handlers = {
  component: (toHast, node) => toHast(node, hyphenate(node.component), { value: node.value })
}

export default {
  name: 'VueRemark',
  functional: true,
  render (h, context) {
    const [ slot ] = context.slots().default
    const components = normalizeKeys(context.props.components || {})

    const createElement = (tag, attrs, children) => {
      const component = components[tag]
      const key = component ? `${tag}-${attrs.value}` : undefined
      const vnode = h(component || tag, { attrs, key }, children)
      if (!component || vnode.componentOptions) return vnode
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