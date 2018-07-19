<template>
  <main>
    <textarea v-model="markdown" autofocus></textarea>
    <article>
      <markdown :plugins="plugins">{{ markdown }}</markdown>
    </article>
  </main>
</template>

<script>
import fs from 'fs'
import VueRemark from '../src/index.js'
import externalLinks from 'remark-external-links'
import MyComponent from './MyComponent.vue'

const markdown = fs.readFileSync('./README.md', 'utf8')

const plugins = [
  () => externalLinks({ target: '_blank', rel: 'noopener' })
]

export default {
  name: 'Playground',
  components: {
    Markdown: VueRemark,
    MyComponent
  },
  data () {
    return { markdown, plugins }
  }
}
</script>