import { createStore } from "vuex";
import { weathersModule } from "./weathersModule";
import { favoritesModule } from "./favoritesModule";

export default createStore({
  modules: {
    weathers: weathersModule,
    favorites: favoritesModule,
  },
});
