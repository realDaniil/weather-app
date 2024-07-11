interface Weather {
  id: number;
  city: string;
}

interface State {
  weathers: Weather[];
}

export const weathersModule = {
  state: (): State => ({
    weathers: JSON.parse(sessionStorage.getItem("weathers") || '[{"id":703448,"city":"Kyiv"}]'),
  }),
  mutations: {
    setWeathers(state: State, weathers: Weather[]) {
      state.weathers = weathers;
    },
    addWeather(state: State, weathers: Weather) {
      state.weathers.push({ ...weathers });
      sessionStorage.setItem("weathers", JSON.stringify(state.weathers));
    },
    deleteWeather(state: State, weatherId: number) {
      state.weathers = state.weathers.filter(
        (weather) => weather.id !== weatherId
      );
      sessionStorage.setItem("weathers", JSON.stringify(state.weathers));
    },
  },
  getters: {
    getWeathers: (state: State) => state.weathers,
  },
};
