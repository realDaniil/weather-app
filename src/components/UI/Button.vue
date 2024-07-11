<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped lang="scss">
.button {
  background: #42b983;
  border-radius: 8px;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 5px;
  text-align: center;

  &:disabled {
    cursor: default;
    background: rgb(112, 0, 0);
  }
}
</style>
