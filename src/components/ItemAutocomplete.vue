<template>
  <p class="item-autocomplete" v-html="text"></p>
</template>

<script>
export default {
  props: {
    item: { required: true }
  },
  computed: {
    text () {
      if (typeof this.item !== 'object') {
        return ''
      }
      return this.item.name + ' (' + this.item.state + ') - ' + this.item.country
    }
  }
}
</script>

<style>
p.item-autocomplete { padding: 4px 5px; color: #333; }
</style>
