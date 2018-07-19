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
