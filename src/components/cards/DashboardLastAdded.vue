<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { DashboardController } from '@/components/controllers/DashboardController'
import { Song } from '@/components/mixins/IPimix'
import { formatDate } from '@/components/mixins/tools'
import { eventBus } from '../mixins/EventsManager'

@Options({})
export default class DashboardLastAdded extends Vue {
  controller = setup(() => DashboardController())

  mounted () {
  }

  created() {
    this.controller.getLastAdded(8)
  }

  getLastAddedCover (): string {
    const lastAddedSong: Song = this.controller.controller.lastadded[0]
    if (lastAddedSong) {
      const url: string = this.controller.getCover(lastAddedSong.id)
      return url
    }
  }

  formatDate (_date: string) {
    return formatDate(_date, true)
  }

  gotoSong (_song: Song): void {
    eventBus.emit('container', { component: 'IDCard', options: { song: _song }})
  }
}
</script>

<template>
  <div class="max-w w-full lg:max-w-full lg:flex">
    <div v-lazy="getLastAddedCover()" class="h-48 lg:h-auto lg:w-48 2xl:w-80 flex-none bg-cover rounded-tl-3xl rounded-tr-3xl lg:rounded-tr-none rounded-bl-none lg:rounded-bl-3xl text-center overflow-hidden">
    </div>
    <div class="truncate w-full bg-white bg-opacity-80 p-4">
      <div class="text-gray-900 font-bold text-xl mb-2">Les derniers ajoutés</div>
      <div v-for="song in controller.controller.lastadded" :key="song.id" class="truncate" @click="gotoSong(song)">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ formatDate(song.createdAt) }}</span>
        {{ song.title }}
      </div>
    </div>
  </div>
</template>