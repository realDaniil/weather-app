<template>
  <div>
    <Input
      type="text"
      v-model="query"
      @input="onInput"
      :placeholder="$t('common.enter_city_name')"
      v-show="isShow"
    />
    <div v-if="!suggestions.length && query.length > 1">
      {{ $t("common.oops_city") }}
    </div>
    <div v-else-if="suggestions.length" class="input-item-holder">
      <div
        class="input-item"
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="selectCity(suggestion.name)"
        tabindex="0"
      >
        {{ suggestion.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CustomInput from "@/components/UI/Input.vue";

export default {
  components: {
    CustomInput,
  },
  data() {
    return {
      query: "",
      suggestions: [],
      isShow: true,
    };
  },
  methods: {
    async onInput() {
      if (this.query.length > 2) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/find?q=${this.query}&appid=${process.env.VUE_APP_WEATHER_API_KEY}`
          );
          this.suggestions = res.data.list;
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      } else {
        this.suggestions = [];
      }
    },
    selectCity(city) {
      this.$emit("select-city", city);
      this.query = "";
      this.suggestions = [];
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-item {
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
  padding: 4px 8px;
  text-align: left;
  background: rgb(252, 252, 252);
  &:hover {
    color: #42b983;
    background: rgb(243, 243, 243);
    outline: none;
  }
}
</style>
