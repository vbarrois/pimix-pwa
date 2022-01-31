import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import AppContainer from '@/components/templates/AppContainer.vue'
import AppHeader from '@/components/templates/AppHeader.vue'
import AppMenu from '@/components/templates/AppMenu.vue'
import AppFooter from '@/components/templates/AppFooter.vue'
import { RouterController } from "@/components/controllers/RouterController"
import { PimixStore } from "@/mixins/IPimix"
import { eventBus } from "@/mixins/EventsManager"

interface AppController {
  connected: boolean
  store: PimixStore
}

export const AppController = () => {

  const router = new RouterController()

  const controller: AppController = reactive({
    connected: false,
    store: inject('Store') as PimixStore
  })

  eventBus.on('playlist', (_event) => {
    switch (_event.action) {
      case 'init': {
        controller.store.playlist = _event.playlist
        break
      }
      case 'add': {
        controller.store.playlist.list.push(_event.item)
      }
    }
  })

  function connect () {
    router.connect()
  }

  function disconnect () {
    router.disconnect()
  }

  return {
    controller,
    connect,
    disconnect,
    AppContainer,
    AppHeader,
    AppMenu,
    AppFooter
  }
}