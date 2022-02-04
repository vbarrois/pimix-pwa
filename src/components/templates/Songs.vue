<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { SongsController } from '@/components/controllers/SongsController'

import SongCard from '@/components/cards/SongCard.vue'

@Options({
  components: { SongCard }
})
export default class Songs extends Vue {
  songsController = setup(() => SongsController())

  mounted () {
  }

  created() {
    this.songsController.getList()
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pr-2 bg-gray-400 bg-opacity-80">
    <div v-for="(song, index) in songsController.songs" :key="index" class="flex truncate">
      <SongCard :song="song"/>
    </div>
  </div>
</template>