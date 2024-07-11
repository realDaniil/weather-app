import axios from "axios";

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;

export const getWeatherByCity = async (cityName: string) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  return res.data;
};

export const getForecastByCity = async (cityName: string) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  return res.data;
};

export const getCityByIP = async () => {
  const res = await axios.get(`https://ipapi.co/json/`);
  return res.data.city;
};
