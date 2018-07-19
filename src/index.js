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
    const components = Object(context.props.components)

    const handlers = {
      component (toHast, node) {
        const { component, value } = node
        const props = components[component]
        return toHast(node, component, typeof props === 'function' ? props(value) : { value })
      }
    }

    return unified()
      .use(markdown)
      .use(context.props.plugins)
      .use(parseComponents)
      .use(remark2rehype, { handlers })
      .use(rehype2react, {
        prefix: false,
        createElement (component, attrs, children) {
          return h(component, { attrs }, children)
        }
      })
      .processSync(slot.text).contents
  }
}