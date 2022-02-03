<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { AppController } from '@/components/controllers/AppController'
import { Song } from './components/mixins/IPimix'

@Options({})
export default class App extends Vue {
  appController = setup(() => AppController())

  mounted() {
    this.appController.connect()
    import.meta.hot.dispose(() => {
      // cleanup side effect on hmr reload
      this.appController.disconnect()
    })
    this.appController.init()
  }

  beforeDestroy () {
  }

  footerSize (): string {
    switch (this.appController.controller.footer.size) {
      case 'player': {
        return 'h-30'
      }
      case 'reduced': {
        return 'h-30'
      }
      case 'full' : {
        return 'h-full'
      }
    }
  }

  setFooterSize (_size: string): void {
    console.log('set footer size', _size)
    this.appController.controller.footer.size = _size
  }

  playingSongCover () {
    const activetrackid: number = this.appController.controller.store.server?.activetrack
    const activetrack: any = this.appController.controller.store.tracks[activetrackid-1]
    if (!_.isNil(activetrack)) {
      const songid: number = activetrack?.item?.song?.id
      if (!_.isNil(songid)) {
        const url: string = this.appController.getCover(songid)
        return url
      }
    }
  }
}
</script>

<template>
  <main v-lazy:background-image="playingSongCover()" class="flex flex-col h-screen bg-cover">
    <component
      :is="appController.AppToaster"
    ></component>
    <div class="flex flex-1 overflow-hidden">
      <div class="flex max-w-30 bg-gray-900">
        <component :is="appController.AppMenu"></component>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="flex h-14 p-2"><component :is="appController.AppHeader"></component></div>
        <div class="flex flex-1 overflow-y-auto my-2"><component :is="appController.AppContainer"></component></div>
        <div class="relative flex bg-gray-500" :class="footerSize()">
          <component
            :is="appController.AppFooter"
            :displaymode="appController.controller.footer.size"
          ></component>
          <!-- <span
            class="absolute top-0 right-0 w-5 h-5 text-center font mt-2 ml-2 text-[12px] text-white font- bg-green-500 rounded-full pt-[1px]"
            @click="setFooterSize('reduced')"
          >Reduce</span> -->
        </div>
      </div>
    </div>
  </main>
</template>
