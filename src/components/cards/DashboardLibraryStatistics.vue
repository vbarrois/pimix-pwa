<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { DashboardController } from '@/components/controllers/DashboardController'
import { Song } from '@/components/mixins/IPimix'
import days from 'dayjs'
import 'dayjs/locale/fr'
import { eventBus } from '../mixins/EventsManager'

@Options({})
export default class DashboardLibraryStatistics extends Vue {
  controller = setup(() => DashboardController())

  mounted () {
    days.locale('fr')
  }

  created() {
    // this.controller.getLibraryStats()
  }

  formatDate (_date: string): string {
    return days(_date).format("D MMM YY")
  }
}
</script>

<template>
  <div class="max-w w-full lg:max-w-full lg:flex truncate">
    <div class="border border-gray-400 lg:border-gray-400 bg-white rounded-b rounded-md p-4 flex flex-col justify-between leading-normal w-full">
      <div class="mb-0">
        <div class="text-gray-900 font-bold text-xl mb-2">Statistiques</div>
        <div class="truncate">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">221</span>
          Morceaux
        </div>
        <div class="truncate">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">21</span>
          Artistes
        </div>
        <div class="truncate">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">17</span>
          Genres
        </div>
        <div class="truncate">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">2 jours 21 minutes 36 secondes</span>
          Total musique
        </div>
      </div>
    </div>
  </div>
</template>