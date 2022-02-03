<template>
  <div class="flex p-2" @click="gotoSong(song)">
    <img v-lazy="getThumb(song.id)" class="w-12 h-12 md:w-20 md:h-20 rounded my-auto">
    <div class="flex flex-col pl-2 pr-2 truncate w-full">
      <span class="text-left text-xl font-bold">{{ song.title }}</span>
      <span class="text-left">{{ song.album }}</span>
      <span class="flex gap-1 text-gray-900">
        <span v-for="(artist, index) in song.Artists.slice(0, 2)" :key="`song-${song.id}-artist-${artist.id}-${index}`"><span class="flex bg-gray-400 rounded-full px-3 py-0 text-sm font-light">{{ artist.name }}</span></span>
        <span v-for="(genre, index) in song.Genres.slice(0, 2)" :key="`song-${song.id}-genre-${genre.id}-${index}`"><span class="flex bg-gray-300 rounded-full px-3 py-0 text-sm font-light">{{ genre.name }}</span></span>
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, setup, Vue } from 'vue-class-component'
import { SongsController } from '@/components/controllers/SongsController'
import { Song } from '@/components/mixins/IPimix'
import { eventBus } from '../mixins/EventsManager'

@Options({
  props: {
    song: Object
  }
})
export default class SongCard extends Vue {
  controller = setup(() => SongsController())
  song: Song

  getThumb (_id: number): string {
    const url: string = this.controller.getThumb(_id)
    return url
  }

  gotoSong (_song: Song): void {
    eventBus.emit('container', { component: 'IDCard', options: { song: _song }})
  }
}
</script>