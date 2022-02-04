import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import AppContainer from '@/components/templates/framework/AppContainer.vue'
import AppHeader from '@/components/templates/framework/AppHeader.vue'
import AppMenu from '@/components/templates/framework/AppMenu.vue'
import AppFooter from '@/components/templates/framework/AppFooter.vue'
import AppToaster from '@/components/templates/framework/AppToaster.vue'

import { RouterController } from "@/components/controllers/RouterController"
import { PimixStore, Vote } from "@/components/mixins/IPimix"
import { eventBus } from "@/components/mixins/EventsManager"
import { REST_SERVER } from "@/components/mixins/REST"

interface AppController {
  connected: boolean
  store: PimixStore
  footer: {
    size: string
  }
}

export const AppController = () => {

  const router = new RouterController()

  const controller: AppController = reactive({
    connected: false,
    store: inject('Store') as PimixStore,
    footer: {
      size: 'player' 
    }
  })

  function init () {
    // Manage in App Controller the queue events
    eventBus.on('queue', (_event) => {
      switch (_event.action) {
        case 'init': {
          controller.store.queue = _event.queue
          break
        }
        case 'add': {
          controller.store.queue.list.push(_event.item)
          break
        }
      }
    })

    // Manage in App Controller the votes events
    eventBus.on('vote', (_event) => {
      switch (_event.action) {
        case 'init': {
          controller.store.votes = _event.votes
          break
        }
        case 'new': {
          const vote: Vote = _event.new
          // Remove if executed, or no more votes, or no more points
          controller.store.votes = _.remove(controller.store.votes, (v: Vote) => {
            return v.uuid !== vote.uuid && v.votes.length > 0 && v.points > 0
          })

          if (vote.executed === false && vote.votes.length > 0 && vote.points > 0) {
            // Add non executed vote to list
            console.log('add to list', vote.uuid)
            controller.store.votes.push(vote)
          }
        }
      }
    })

    // Manage in App Controller the votes events
    eventBus.on('player', (_event) => {
      const trackIndex: number = _event.player.num
      controller.store.tracks[trackIndex - 1] = _event.player.track
    })

    // Manage in App Controller the votes events
    eventBus.on('pimixserver', (_event) => {
      if (!_.isNil(_event.list)) {
        controller.store.servers = _event.list
      }

      if (!_.isNil(_event.current)) {
        controller.store.server = _event.current
      }
    })

    eventBus.on('send', (_event) => {
      router.sendCommand(_event.command, _event.params)
    })
  }

  function leave () {
    eventBus.off('queue')
    eventBus.off('vote')
  }
  

  function connect () {
    router.connect()
  }

  function disconnect () {
    router.disconnect()
  }

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }

  return {
    controller,
    connect,
    init,
    disconnect,
    getCover,
    AppContainer,
    AppHeader,
    AppMenu,
    AppFooter,
    AppToaster
  }
}