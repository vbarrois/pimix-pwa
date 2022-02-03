<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { DashboardController } from '@/components/controllers/DashboardController'
import { Song } from '@/components/mixins/IPimix'
import days from 'dayjs'
import 'dayjs/locale/fr'
import { eventBus } from '../mixins/EventsManager'

@Options({})
export default class DashboardMostPlayed extends Vue {
  controller = setup(() => DashboardController())

  mounted () {
    days.locale('fr')
  }

  created() {
    this.controller.getMostPlayed(8)
  }

  getMostPlayedCover (): string {
    const mostPlayedSong: Song = this.controller.controller.mostplayed[0]
    if (mostPlayedSong) {
      const url: string = this.controller.getCover(mostPlayedSong.id)
      return url
    }
  }

  gotoSong (_song: Song): void {
    eventBus.emit('container', { component: 'IDCard', options: { song: _song }})
  }

  formatDate (_date: string): string {
    return days(_date).format("D MMM YY")
  }
}
</script>

<template>
  <div class="max-w w-full lg:max-w-full lg:flex">
    <div v-lazy="getMostPlayedCover()" class="h-48 lg:h-auto lg:w-48 2xl:w-80 flex-none bg-cover rounded-tl-3xl rounded-tr-3xl md:rounded-tr-none rounded-bl-none md:rounded-bl-3xl text-center overflow-hidden">
    </div>
    <div class="truncate w-full bg-white bg-opacity-80 p-4">
      <div class="text-gray-900 font-bold text-xl mb-2">Les plus joués</div>
      <div v-for="song in controller.controller.mostplayed" :key="song.id" class="truncate" @click="gotoSong(song)">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ song.count }}x</span>
        {{ song.title }}
      </div>
    </div>
  </div>
</template>