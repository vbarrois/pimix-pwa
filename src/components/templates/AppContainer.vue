<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import { eventBus } from '@/components/mixins/EventsManager'

import { defineAsyncComponent } from '@vue/runtime-dom'

const DashBoard = defineAsyncComponent(() =>
  import('@/components/templates/Dashboard.vue')
)

const Songs = defineAsyncComponent(() =>
  import('@/components/templates/Songs.vue')
)

const Artists = defineAsyncComponent(() =>
  import('@/components/templates/Artists.vue')
)

const Genres = defineAsyncComponent(() =>
  import('@/components/templates/Genres.vue')
)

const Settings = defineAsyncComponent(() =>
  import('@/components/templates/Settings.vue')
)

const Player = defineAsyncComponent(() =>
  import('@/components/templates/Player.vue')
)

const Playlist = defineAsyncComponent(() =>
  import('@/components/templates/Playlist.vue')
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