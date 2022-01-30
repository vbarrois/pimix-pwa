import App from "./App.vue"
import { createApp } from "vue"
import VueLazyLoad from 'vue3-lazyload'

import "./css/index.css"

const pimix = createApp(App)
pimix.use(VueLazyLoad, {})
pimix.mount("#pimix");
