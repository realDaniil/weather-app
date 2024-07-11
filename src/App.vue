<template>
  <h1>Weather Cards</h1>
  <nav>
    <router-link to="/">{{ $t("common.home_page") }}</router-link>
    <router-link to="/favorites">{{ $t("common.favorites_page") }}</router-link>
    <select class="select" @change="changeLanguage($event.target.value)">
      <option value="en">English</option>
      <option value="uk">Українська</option>
    </select>
  </nav>

  <router-view />
</template>

<script>
import { setI18nLanguage } from "@/i18n/index";

export default {
  methods: {
    changeLanguage(locale) {
      setI18nLanguage(locale);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.select {
  /* position: absolute; */
}

@media (max-width: 600px) {
  #app {
    padding: 10px;
  }
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 8px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
