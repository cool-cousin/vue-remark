<template>
  <main>
    <textarea v-model="markdown" autofocus></textarea>
    <article>
      <markdown :plugins="plugins" :components="components">{{ markdown }}</markdown>
    </article>
  </main>
</template>

<script>
import fs from 'fs'
import VueRemark from '../src/index.js'
import externalLinks from 'remark-external-links'

const markdown = fs.readFileSync('./README.md', 'utf8')

const plugins = [
  () => externalLinks({ target: '_blank', rel: 'noopener' })
]

const components = Object.freeze({
  MyComponent: () => import('./MyComponent.vue'),
})

export default {
  name: 'Playground',
  components: {
    Markdown: VueRemark
  },
  data () {
    return { markdown, plugins, components }
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
main {
  display: flex;
  height: 100%;
}

textarea, article {
  width: 50%;
  display: inline-block;
  word-wrap: break-word;
  white-space: pre-wrap;
  padding: 1em;
}

textarea {
  background-color: #f0f0f0;
}
</style>