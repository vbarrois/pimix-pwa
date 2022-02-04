<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { PlaylistController } from '@/components/controllers/PlaylistController'

import SongCard from '@/components/cards/SongCard.vue'
import VoteCard from '@/components/cards/VoteCard.vue'

@Options({
  components: { SongCard, VoteCard }
})
export default class Playlist extends Vue {
  controller = setup(() => PlaylistController())

  maxDisplayedQueuesSongs: number = 20 // limit playlist history length for performance 
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="text-center"><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-light text-gray-700 mb-2">{{ controller.queue.playingUUID }}</span></div>
    <div class="text-center pt-1">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-light text-gray-700 mr-2 mb-2">{{ controller.queue.list.length }} Played</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-light text-gray-700 mr-2 mb-2">{{ controller.votes.length }} Voted</span>
    </div>
    <div
      v-for="(vote, index) in controller.votes"
      :key="`vote-${index}`"
      class="grid grid-cols-1 gap-2 bg-white text-black bg-opacity-80"
    >
      <VoteCard :vote="vote"/>
    </div>
    <div class="border border-yellow-400"></div>
    <div 
      v-for="(queueItem, index) in controller.queue.list.slice(controller.queue.list.length - maxDisplayedQueuesSongs, controller.queue.list.length).reverse()" 
      :key="`playlistitem-${index}`"
      class="grid grid-cols-1 gap-2 bg-gray-900 text-white bg-opacity-80"
    >
      <SongCard :song="queueItem.song"/>
    </div>
  </div>
</template>