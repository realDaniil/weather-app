<template>
  <div class="modal" v-show="isVisible" @click.self="$emit('close')">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
}
</style>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
