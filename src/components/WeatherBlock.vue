<template>
  <div class="card" v-if="weather">
    <Modal :isVisible="isModalVisible" @close="closeModal">
      <p>{{ $t("common.sure_delete") }}</p>
      <Button @click="closeModal">{{ $t("common.back") }}</Button>
      <Button style="background: red" @click="deleteBlock">{{
        $t("common.remove")
      }}</Button>
    </Modal>
    <div>
      <div style="display: flex; align-items: center; justify-content: center">
        <h2>{{ weather?.name || "--" }}</h2>
        <img
          v-show="icon"
          :src="'http://openweathermap.org/img/wn/' + icon + '@2x.png'"
          alt="image"
        />
      </div>
      <p v-if="weather">
        {{
          $t(`weather.${weather?.weather[0].description.split(" ").join("_")}`)
        }}
      </p>
      <p>{{ $t("card.temperature") }} {{ weather?.main.temp || "--" }}°C</p>
      <p>{{ $t("card.humidity") }} {{ weather?.main.humidity || "--" }}%</p>
      <p>{{ $t("card.wind_speed") }} {{ weather?.wind.speed || "--" }} m/s</p>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <WeatherChart :data="chartData" :labels="chartLabels" />
      <div v-if="forecast.length > 0">
        <label for="daySelect">{{ $t("common.choose_day") }}: </label>
        <select id="daySelect" v-model="selectedDay" @change="updateChartData">
          <option v-for="(day, index) in limitedDays" :key="index" :value="day">
            {{ day }}
          </option>
        </select>
      </div>
      <div class="btns-holder">
        <CircleButton
          class="pi pi-trash"
          @click="isModalVisible = true"
          v-show="isShowDeleteButton"
          style="background: #737373"
        >
        </CircleButton>
        <div v-show="weather" class="like-button">
          <CircleButton
            style="background: red"
            @click="toggleFavorite"
            :class="isFavoriteId ? 'pi pi-heart-fill' : 'pi pi-heart'"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="card" style="gap: 1rem" v-else>
    <AutocompleteInput
      @select-city="fetchWeatherData"
      v-show="!isFavorite && !cityName"
    />
    {{ $t("common.choose_city") }}
  </div>
</template>

<script>
import AutocompleteInput from "./AutocompleteInput.vue";
import WeatherChart from "./WeatherChart.vue";
import { getWeatherByCity, getForecastByCity } from "../utils/weatherService";
import { useStore } from "vuex";
import CircleButton from "./UI/CircleButton.vue";

export default {
  components: {
    AutocompleteInput,
    WeatherChart,
    CircleButton,
  },
  props: {
    isShowDeleteButton: Boolean,
    isFavorite: Boolean,
    favorite: Object,
    cityName: String,
  },
  data() {
    return {
      weather: null,
      forecast: [],
      chartData: [],
      chartLabels: [],
      selectedDay: null,
      availableDays: [],
      store: useStore(),
      icon: "",
      isModalVisible: false,
    };
  },
  computed: {
    limitedDays() {
      return this.availableDays.slice(0, 3);
    },
    isFavoriteId() {
      if (!this.weather) return false;
      const favoriteIds = this.store.state.favorites.favorites;
      return favoriteIds.some((item) => item.id === this.weather.id);
    },
  },
  mounted() {
    if (this.cityName) {
      this.fetchWeatherData(this.cityName);
    }
    if (this.isFavorite && this.favorite) {
      this.fetchWeatherData(this.favorite.city);
    }
  },

  methods: {
    async fetchWeatherData(city) {
      try {
        const weatherData = await getWeatherByCity(city);
        this.weather = weatherData;
        this.icon = weatherData.weather[0].icon;
        const forecastData = await getForecastByCity(city);
        this.forecast = forecastData.list;
        this.availableDays = [
          ...new Set(
            this.forecast.map((entry) =>
              new Date(entry.dt * 1000).toLocaleDateString()
            )
          ),
        ];
        this.selectedDay = this.limitedDays[0];
        this.updateChartData();
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    updateChartData() {
      if (!this.selectedDay) return;

      let filteredForecast = this.forecast.filter(
        (entry) =>
          new Date(entry.dt * 1000).toLocaleDateString() === this.selectedDay
      );

      if (filteredForecast.length < 8) {
        const currentIndex = this.availableDays.indexOf(this.selectedDay);
        if (currentIndex < this.availableDays.length - 1) {
          const nextDay = this.availableDays[currentIndex + 1];
          filteredForecast = filteredForecast.concat(
            this.forecast.filter(
              (entry) =>
                new Date(entry.dt * 1000).toLocaleDateString() === nextDay
            )
          );
        }
      }

      this.chartData = filteredForecast.map((entry) => entry.main.temp);
      this.chartLabels = filteredForecast.map(
        (entry) => new Date(entry.dt * 1000)
      );
    },
    deleteBlock() {
      this.$emit("delete");
      this.isModalVisible = false;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    toggleFavorite() {
      if (this.isFavoriteId) {
        this.store.commit("deleteFavorite", this.weather.id);
      } else {
        this.store.commit("addFavorite", {
          id: this.weather.id,
          city: this.weather.name,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  margin: 1rem 0;
  border-radius: 1rem;
  padding: 1rem;
  background: rgb(251, 251, 251);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btns-holder {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: end;
}
@media (max-width: 540px) {
  .card {
    flex-direction: column;
    width: 320px;
    margin: 1rem auto;
  }
  .like-button {
    bottom: 10px;
    right: 10px;
  }
}
p {
  text-align: left;
}
</style>
//да 200 строк это много, не было времени для разбивки :) 
