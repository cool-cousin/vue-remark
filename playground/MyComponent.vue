<template>
  <blockquote>“{{ value }}”</blockquote>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    value: String
  }
}
</script>

<style scoped>
blockquote {
  background-color: #fafafa;
  padding: 1em;
}
</style>