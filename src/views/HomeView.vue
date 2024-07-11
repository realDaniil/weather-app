<template>
  <div style="padding-bottom: 3rem">
    <CircleButton
      class="add-button"
      @click="addWeatherBlock"
      :disabled="weatherBlocks.length >= 5"
    >
      +
    </CircleButton>
    <transition-group name="list" tag="div" class="w-full">
      <div v-for="block in weatherBlocks" :key="block.id">
        <WeatherBlock
          :isShowDeleteButton="isShowDeleteButton"
          @delete="removeWeatherBlock(block.id)"
          :cityName="block.city"
        />
      </div>
    </transition-group>
  </div>
</template>
<script>
import WeatherBlock from "@/components/WeatherBlock.vue";
import { ref } from "vue";

export default {
  components: {
    WeatherBlock,
  },
  setup() {
    const weatherBlocks = ref([{ id: 703448, city: "Kyiv" }]);
    let isShowDeleteButton = ref(false);

    const updateDeleteButton = () => {
      isShowDeleteButton.value = weatherBlocks.value.length > 1;
    };

    const addWeatherBlock = () => {
      if (weatherBlocks.value.length < 5) {
        weatherBlocks.value.unshift({ id: Date.now() });
      }
      updateDeleteButton();
    };

    const removeWeatherBlock = (id) => {
      if (weatherBlocks.value.length > 1) {
        const index = weatherBlocks.value.findIndex((block) => block.id === id);
        if (index !== -1) {
          weatherBlocks.value.splice(index, 1);
        }
      }
      updateDeleteButton();
    };

    return {
      weatherBlocks,
      isShowDeleteButton,
      addWeatherBlock,
      removeWeatherBlock,
    };
  },
};
</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
  width: 50px;
  height: 50px;
  font-size: 25px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(-30px, -30px);
}
.list-leave-active {
  /* position: absolute; */
  transform: translate(0);
  opacity: 0;
  scale: 0;
  max-height: 0;
}
</style>
