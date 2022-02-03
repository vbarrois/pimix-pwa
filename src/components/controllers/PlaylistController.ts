import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import { PimixStore } from "@/components/mixins/IPimix"

interface PlaylistController {
  store: PimixStore
}

export const PlaylistController = () => {

  const controller: PlaylistController = reactive({
    store: inject('Store') as PimixStore
  })

  return {
    store: controller.store
  }
}