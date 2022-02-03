import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import PlayerControl from '@/components/templates/PlayerControl.vue'

import { PimixStore } from "@/components/mixins/IPimix"
import { REST_SERVER } from "@/components/mixins/REST"

interface PlayerController {
  store: PimixStore,
}

export const PlayerController = () => {

  const controller: PlayerController = reactive({
    store: inject('Store') as PimixStore,
  })

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }

  return {
    store: controller.store,
    getCover,
    PlayerControl
  }
}