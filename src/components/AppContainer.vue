<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { eventBus } from '@/mixins/EventsManager'

import { defineAsyncComponent } from '@vue/runtime-dom'

const DashBoard = defineAsyncComponent(() =>
  import('@/components/Dashboard.vue')
)

const Songs = defineAsyncComponent(() =>
  import('@/components/Songs.vue')
)

const Artists = defineAsyncComponent(() =>
  import('@/components/Artists.vue')
)

const Genres = defineAsyncComponent(() =>
  import('@/components/Genres.vue')
)

const Settings = defineAsyncComponent(() =>
  import('@/components/Settings.vue')
)

const Player = defineAsyncComponent(() =>
  import('@/components/Player.vue')
)

const Playlist = defineAsyncComponent(() =>
  import('@/components/Playlist.vue')
)

@Options({})
export default class AppHeader extends Vue {

  displayedComponent = DashBoard

  created () {
    eventBus.on('container', (e: { component: string }) => {
      console.log('load component', e.component)
      switch (e.component) {
        case 'dashboard':
          this.displayedComponent = DashBoard
          break
        case 'songs':
          this.displayedComponent = Songs
          break
        case 'artists':
          this.displayedComponent = Artists
          break
        case 'genres':
          this.displayedComponent = Genres
          break
        case 'settings':
          this.displayedComponent = Settings
          break
        case 'player':
          this.displayedComponent = Player
          break
        case 'playlist':
          this.displayedComponent = Playlist
          break
      }

    })
  }
}
</script>

<template>
  <div class="container mx-auto">
    <component :is="displayedComponent"></component>
  </div>
</template>