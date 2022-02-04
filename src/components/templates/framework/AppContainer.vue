<script lang='ts'>
import _ from 'lodash'
import { Options, Vue } from 'vue-class-component'
import { eventBus } from '@/components/mixins/EventsManager'

import { defineAsyncComponent, markRaw } from '@vue/runtime-dom'
import { Page } from '@/components/mixins/IPimix'

const pages: Page[] = [
  {
    name: 'dashboard',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/Dashboard.vue')
    ))
  },
  {
    name: 'songs',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/Songs.vue')
    ))
  },
  {
    name: 'artists',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/Artists.vue')
    ))
  },
  {
    name: 'genres',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/Genres.vue')
    ))
  },
  {
    name: 'settings',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/Settings.vue')
    ))
  },
  {
    name: 'IDCard',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/IDCard.vue')
    ))
  },
  {
    name: 'queue',
    template: markRaw(defineAsyncComponent(() =>
      import('@/components/templates/Queue.vue')
    ))
  }
]

@Options({})
export default class AppHeader extends Vue {

  displayedComponent: Page = pages[0] // default page

  mounted () {
    eventBus.on('container', (_event: { component: string, options?: any }) => {
      this.displayedComponent = {
        ..._.filter(pages, (page: Page) => {
          return page.name === _event.component
        })[0],
        ...{
          params: _event.options
        }
      }
    })
  }

  unmounted () {
    eventBus.off('container')
  }
}
</script>

<template>
  <div class="container mx-auto">
    <component :is="displayedComponent.template" :params="displayedComponent.params" class="my-4"></component>
  </div>
</template>