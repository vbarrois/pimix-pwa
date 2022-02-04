import App from "./App.vue"
import { createApp, reactive } from "vue"
import VueLazyLoad from 'vue3-lazyload'

import "./css/index.css"

const pimix = createApp(App)

const store = reactive({
  queue: {
    playlistUUID: '',
    list: []
  },
  votes: {
    playlistUUID: '',
    list: []
  },
  tracks: []
})

pimix.provide('Store', store)
pimix.use(VueLazyLoad, {})
pimix.mount("#pimix")