import { createApp } from "vue";
import App from "./App.vue";
import VueLazyLoad from 'vue3-lazyload'

import "./css/index.css";

const app = createApp(App)
app.use(VueLazyLoad, {
  
})
app.mount("#app");
