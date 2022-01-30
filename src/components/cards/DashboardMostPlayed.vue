<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { DashboardController } from '@/mixins/DashboardController'
import { Song } from '@/mixins/IPimix'
import days from 'dayjs'
import 'dayjs/locale/fr'

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

  formatDate (_date: string): string {
    return days(_date).format("D MMM YY")
  }
}
</script>

<template>
  <div class="max-w w-full lg:max-w-full lg:flex">
    <div v-lazy="getMostPlayedCover()" class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-xl-bl-sm rounded-tl-md text-center overflow-hidden" title="Woman holding a mug">
    </div>
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
      <div class="mb-0">
        <div class="text-gray-900 font-bold text-xl mb-2">Les plus joués</div>
        <div v-for="song in controller.controller.mostplayed" :key="song.id" class="truncate">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ song.count }}x</span>
          {{ song.title }}
        </div>
      </div>
    </div>
  </div>
</template>