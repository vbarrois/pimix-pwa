<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { PlayerController } from '@/components/controllers/PlayerController'
import { formatSeconds } from '@/components/mixins/tools'
import { Song, Track } from '@/components/mixins/IPimix'
import { eventBus } from '../mixins/EventsManager'
import { shallowRef } from '@vue/reactivity'
import { defineAsyncComponent } from '@vue/runtime-core'

@Options({
  props: {
    // displaymode: String
  }
})
export default class AppFooter extends Vue {
  playerContoller = setup(() => PlayerController())
  displaymode: string = 'reduced'

  SongTools = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/cards/SongTools.vue')
    )
  )

  PlayerControl = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/templates/PlayerControl.vue')
    )
  )

  mounted () {
    eventBus.on('interface', (_event) => {
      switch (_event.command) {
        case 'playertoggle':
          this.displaymode = (this.isReduced) ? 'expand' : 'reduced'
        break
      }
    })
  }

  unmounted () {
    eventBus.off('interface')
  }

  currentTrack (): Track {
    return this.playerContoller.controller.activeTrack
  }

  currentSong (): Song {
    return this.playerContoller.controller.activeSong
  }

  elapsedTime (): string {
    return formatSeconds(this.playerContoller.controller.elapsed)
  }

  totalTime (): string {
    return formatSeconds(this.playerContoller.controller.duration)
  }

  playingSongCover () {
    const activetrack: Track = this.currentTrack()
    if (!_.isNil(activetrack)) {
      const songid: number = activetrack?.item?.song?.id
      if (!_.isNil(songid)) {
        const url: string = this.playerContoller.getCover(songid)
        return url
      }
    }
  }

  progress (_track: Track) {
    return 100 * _track?.elapsed / _track?.item.song.duration
  }

  get isReduced (): boolean {
    return this.displaymode === 'reduced'
  }
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="w-full flex-col p-2">
      <div v-if="!isReduced" class="flex flex-col text-white">
        <div class="inline-flex mx-auto relative">
          <div
            v-lazy="playingSongCover()"
            class="absolute bg-white -left-20 -top-[130px] mx-auto h-40 w-40 bg-cover rounded-xl border-2 border-white">
          </div>
        </div>
        <div class="flex">
          <span class="text-2xl">{{ elapsedTime() }}</span>
          <span class="text-2xl ml-auto">{{ totalTime() }}</span>
        </div>
      </div>
      <div class="flex flex-col text-white">
        <div class="text-center font-extrabold">{{ currentSong()?.title }}</div>
        <div class="text-center mt-1 truncate">
          <span v-for="(artist, index) in currentSong()?.Artists.slice(0, 2)" :key="`song-${currentSong()?.id}-artist-${artist.id}-${index}`"><span class="bg-gray-400 rounded-full px-3 py-1">{{ artist.name }}</span></span>
        </div>
      </div>
    </div>
    <div class="relative w-full bg-gray-200 h-1.5">
      <div class="absolute bg-blue-800 h-1.5 w-full"></div>
      <div class="absolute bg-white h-1.5" :style="`width: ${playerContoller.controller?.progressbar?.end}%`"></div>
      <div class="absolute bg-green-600 h-1.5" :style="`width: ${playerContoller.controller?.progressbar?.position}%`"></div>
      <div class="absolute bg-blue-800 h-1.5" :style="`width: ${playerContoller.controller?.progressbar?.start}%`"></div>
    </div>
    <component
      :is="SongTools"
      v-if="!isReduced" 
      :params="currentTrack()?.item"
      :toolbar="true"
      class="w-full text-white bg-gray-800">
    </component>

    <component
      :is="PlayerControl"
      class="bg-gray-800"></component>
  </div>
</template>

<style scoped>
.movetext div {
    position: absolute;
    white-space: nowrap;
    animation: floatText 5s infinite alternate ease-in-out;
}

@-webkit-keyframes floatText{
  from {
    left: -30%;
  }

  to {
    /* left: auto; */
    left: 80%;
  }
}
</style>