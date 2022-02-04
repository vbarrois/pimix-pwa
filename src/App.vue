<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { AppController } from '@/components/controllers/AppController'

import AppToaster from '@/components/templates/framework/AppToaster.vue'
import AppHeader from '@/components/templates/framework/AppHeader.vue'
import AppContainer from '@/components/templates/framework/AppContainer.vue'
import AppMenu from '@/components/templates/framework/AppMenu.vue'
import AppFooter from '@/components/templates/framework/AppFooter.vue'

import PlaylistModal from '@/components/templates/ModalPlaylists.vue'


@Options({
  components: { AppHeader, AppContainer, AppMenu, AppFooter, AppToaster, PlaylistModal }
})
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

  unmounted () {
    this.appController.quit()
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

  <PlaylistModal/>
  <main v-lazy:background-image="playingSongCover()" class="flex flex-col h-screen bg-cover">
    <AppToaster/>
    <div class="flex flex-1 overflow-hidden">
      <div class="flex max-w-30 bg-gray-900">
        <AppMenu/>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="flex h-14 p-2"><AppHeader/></div>
        <div class="flex flex-1 overflow-y-auto my-2"><AppContainer/></div>
        <div class="relative flex bg-gray-500" :class="footerSize()">
          <AppFooter
            :displaymode="appController.controller.footer.size"
          />
        </div>
      </div>
    </div>
  </main>
</template>
