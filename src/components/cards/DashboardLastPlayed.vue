<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { DashboardController } from '@/mixins/DashboardController'
import { Song } from '@/mixins/IPimix'
import days from 'dayjs'
import 'dayjs/locale/fr'

@Options({})
export default class DashboardLastAdded extends Vue {
  controller = setup(() => DashboardController())

  mounted () {
    days.locale('fr')
  }

  created() {
    this.controller.getLastPlayed(8)
  }

  getLastPlayedCover (): string {
    const lastPlayedSong: Song = this.controller.controller.lastplayed[0]
    if (lastPlayedSong) {
      const url: string = this.controller.getCover(lastPlayedSong.id)
      return url
    }
  }

  formatDate (_date: string): string {
    const today = new Date()
    const date = new Date(_date)
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
      return days(_date).format("hh:mm")
    } else {
      return days(_date).format("D MMM YY")
    }
  }
}
</script>

<template>
  <div class="max-w w-full lg:max-w-full lg:flex">
    <div v-lazy="getLastPlayedCover()" class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-xl-bl-sm rounded-tl-md text-center overflow-hidden">
    </div>
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
      <div class="mb-0">
        <div class="text-gray-900 font-bold text-xl mb-2">Derniers titres joués</div>
        <div v-for="song in controller.controller.lastplayed" :key="song.id" class="truncate">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ formatDate(song.playedDate) }}</span>
          {{ song.title }}
        </div>
      </div>
    </div>
  </div>
</template>