import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import { PimixStore } from "@/mixins/IPimix"

interface MenuController {
  store: PimixStore
}

export const MenuController = () => {

  const controller: MenuController = reactive({
    store: inject('Store') as PimixStore
  })

  return {
    controller
  }
}