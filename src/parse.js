const rComponent = /^@\[(\w+)\]\(([^()]*)\)/

function tokenizeComponent (eat, value, silent) {
  const match = rComponent.exec(value)
  if (!match) return null
  if (silent) return true
  const [all, component, props] = match
  return eat(all)({ type: 'component', component, props })
}

tokenizeComponent.locator = (value, fromIndex) => value.indexOf('@[', fromIndex)

export default function parseComponents () {
  const { inlineTokenizers, inlineMethods } = this.Parser.prototype
  inlineTokenizers.component = tokenizeComponent
  inlineMethods.splice(inlineMethods.indexOf('link'), 0, 'component')
}
