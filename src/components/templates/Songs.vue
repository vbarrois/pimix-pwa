<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { SongsController } from '@/mixins/SongsController'
import { Song } from '@/mixins/IPimix'
import { eventBus } from '@/mixins/EventsManager'


@Options({})
export default class Songs extends Vue {
  controller = setup(() => SongsController())

  mounted () {
  }

  created() {
    this.controller.getList()
    eventBus.emit('header', { action: 'ready' } )
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
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
    <div v-for="(song, index) in controller.controller.songs" :key="index" class="flex p-2">
      <img v-lazy="getThumb(song.id)" class="w-12 h-12 md:w-20 md:h-20 rounded my-auto">
      <div class="flex flex-col pl-2 pr-2 truncate">
        <span class="text-left text-xl font-bold" @click="getSong(song.id)">{{ song.title }}</span>
        <span class="text-left">{{ song.album }}</span>
      </div>
    </div>
  </div>
</template>