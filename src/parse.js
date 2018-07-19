const rComponent = /^@\[(\w+)\]\(([^()]*)\)/

function tokenizeComponent (eat, text, silent) {
  const match = rComponent.exec(text)
  if (!match) return null
  if (silent) return true
  const [all, component, value] = match
  return eat(all)({ type: 'component', component, value })
}

export default function parseComponents () {
  const { blockTokenizers, blockMethods } = this.Parser.prototype
  blockTokenizers.component = tokenizeComponent
  blockMethods.unshift('component')
}
