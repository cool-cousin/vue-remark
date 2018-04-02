import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import parseComponents from './parse'

export default {
  name: 'VueRemark',
  functional: true,
  inject: {
    mdComponents: {
      default: {}
    }
  },
  render (createElement, context) {
    const [slot] = context.slots().default
    const { mdComponents } = context.injections

    const handlers = {
      component (h, node) {
        const mdComponent = mdComponents[node.component]

        if (typeof mdComponent === 'function') return mdComponent(h, node)
        if (typeof mdComponent === 'string') return h(node, mdComponent)

        const { props } = Object(mdComponent)
        return h(node, node.component, {
          props: typeof props === 'function' ? props(node.props) : null
        })
      }
    }

    const components = Object.keys(mdComponents).reduce((components, name) => {
      const { component } = mdComponents[name]
      if (component) components[name] = component
      return components
    }, {})

    return unified()
      .use(markdown)
      .use(parseComponents)
      .use(remark2rehype, { handlers })
      .use(rehype2react, { createElement, components, prefix: false })
      .processSync(slot.text).contents
  }
}