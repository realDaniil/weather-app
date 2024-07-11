<template>
  <div>
    <div v-show="!favorites.length">
      <p>{{ $t("common.save_the_card") }}</p>
    </div>
    <div v-for="favorite in favorites" :key="favorite.id">
      <WeatherBlock
        :isShowDeleteButton="isShowDeleteButton"
        isFavorite
        :favorite="favorite"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { useStore } from "vuex";
import WeatherBlock from "@/components/WeatherBlock.vue";

export default {
  components: {
    WeatherBlock,
  },
  data() {
    return {
      store: useStore(),
      favorites: store.state.favorites.favorites,
    };
  },
};
</script>
