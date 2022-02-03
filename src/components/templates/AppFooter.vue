<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { PlayerController } from '@/components/controllers/PlayerController'
import { formatSeconds } from '@/components/mixins/tools'
import { Song, Track } from '@/components/mixins/IPimix'
import { eventBus } from '../mixins/EventsManager'

@Options({
  props: {
    // displaymode: String
  }
})
export default class AppFooter extends Vue {
  playerContoller = setup(() => PlayerController())
  displaymode: string = 'reduced'

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
    const activetrackid: number = this.playerContoller.store.server?.activetrack
    const activetrack: Track = this.playerContoller.store.tracks[activetrackid-1]
    return activetrack
  }

  currentSong (): Song {
    if (!_.isNil(this.currentTrack())) {
      return this.currentTrack().item.song
    } 
  }

  elapsedTime (): string {
    if (!_.isNil(this.currentTrack())) {
      return formatSeconds(this.currentTrack().elapsed)
    } 
  }

  totalTime (): string {
    if (!_.isNil(this.currentSong())) {
      return formatSeconds(this.currentSong().duration)
    } 
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
    <component :is="playerContoller.PlayerControl"></component>
  </div>
</template>