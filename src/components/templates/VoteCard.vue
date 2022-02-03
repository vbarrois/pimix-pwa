<template>
  <div class="flex p-2" @click="gotoSong(vote.song)">
    <img v-lazy="getThumb(vote.song.id)" class="w-12 h-12 md:w-20 md:h-20 rounded my-auto">
    <div class="flex my-auto pl-2">
      <span class="flex bg-gray-200 rounded-full px-3 py-1 text-sm font-light text-gray-700">{{ vote.points }}<span class="hidden md:block ml-1">Points</span></span>
    </div>
    <div class="flex flex-col pl-2 pr-2 truncate">
      <span class="text-left text-xl font-bold">{{ vote.song.title }}</span>
      <span class="text-left">{{ vote.song.album }}</span>
      <span class="flex gap-1">
        <span v-for="(artist, index) in vote.song.Artists.slice(0, 2)" :key="`song-${vote.song.id}-artist-${artist.id}-${index}`"><span class="flex bg-gray-400 rounded-full px-3 py-1 text-sm font-bold text-gray-700">{{ artist.name }}</span></span>
        <span v-for="(genre, index) in vote.song.Genres.slice(0, 2)" :key="`song-${vote.song.id}-genre-${genre.id}-${index}`"><span class="flex bg-gray-300 rounded-full px-3 py-1 text-sm font-bold text-gray-700">{{ genre.name }}</span></span>
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, setup, Vue } from 'vue-class-component'
import { SongController } from '@/components/controllers/SongController'
import { Song, Vote } from '@/components/mixins/IPimix'
import { eventBus } from '../mixins/EventsManager'

@Options({
  props: {
    vote: Object
  }
})
export default class VoteCard extends Vue {
  songController = setup(() => SongController())
  
  vote: Vote

  getThumb (_id: number): string {
    const url: string = this.songController.getThumb(_id)
    return url
  }

  gotoSong (_song: Song): void {
    eventBus.emit('container', { component: 'IDCard', options: { song: _song }})
  }
}
</script>