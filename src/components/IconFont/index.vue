<template>
  <i :class="['icon', getIconType]" />
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    iconType: {
      type: String,
      required: true,
    },
  },
  computed: {
    getIconType() {
      return `icon-${this.iconType}`;
    },
  },
};
</script>
<style scoped>
@import './icon.css';
</style>
