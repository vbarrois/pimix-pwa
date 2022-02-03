<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { SongsController } from '@/components/controllers/SongsController'
import { eventBus } from '@/components/mixins/EventsManager'
import { Song } from '../mixins/IPimix'
import { shallowRef } from '@vue/reactivity'
import { defineAsyncComponent } from '@vue/runtime-core'

@Options({})
export default class Songs extends Vue {
  controller = setup(() => SongsController())

  SongCard = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/templates/SongCard.vue')
    )
  )

  mounted () {
  }

  created() {
    this.controller.getList()
  }

  getSong (_id: number): any {
    this.controller.getSong(_id)
      .then((result: Song) => {
        return result
      })
  }

  getThumb (_id: number): string {
    const url: string = this.controller.getThumb(_id)
    return url
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pr-2 bg-gray-400 bg-opacity-80">
    <div v-for="(song, index) in controller.controller.songs" :key="index" class="flex truncate">
      <component :is="SongCard" :song="song"></component>
    </div>
  </div>
</template>