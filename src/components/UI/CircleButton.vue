<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped>
.button {
  font-size: 20px;
  color: white;
  background: #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
