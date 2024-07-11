import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import "./style.css";
import "primeicons/primeicons.css";
import i18n from "./i18n";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component.component);
});

app.use(i18n).use(store).use(router).mount("#app");
