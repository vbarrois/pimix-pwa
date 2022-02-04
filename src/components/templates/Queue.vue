<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { PlaylistController } from '@/components/controllers/PlaylistController'
import { defineAsyncComponent, shallowRef } from '@vue/runtime-core'
import { Vote } from '../mixins/IPimix'
import days from 'dayjs'

@Options({})
export default class Playlist extends Vue {
  controller = setup(() => PlaylistController())

  maxDisplayedQueuesSongs: number = 20 // limit playlist history length for performance 

  SongCard = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/templates/SongCard.vue')
    )
  )
  
  VoteCard = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/templates/VoteCard.vue')
    )
  )

  sortedVotes () {
    return _.orderBy(this.controller.store.votes, [
      (vote) => { return vote.points },
      (vote) => { return vote.createdAt }
    ], [
      'asc', 'desc'
    ])
  }
  
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="text-center"><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-light text-gray-700 mb-2">{{ controller.store.queue.playingUUID }}</span></div>
    <div class="text-center pt-1">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-light text-gray-700 mr-2 mb-2">{{ controller.store.queue.list.length }} Played</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-light text-gray-700 mr-2 mb-2">{{ controller.store.votes.length }} Voted</span>
    </div>
    <div
      v-for="(vote, index) in sortedVotes()"
      :key="`vote-${index}`"
      class="grid grid-cols-1 gap-2 bg-white text-black bg-opacity-80"
    >
      <component
        :is="VoteCard"
        :vote="vote"
      >
      </component>
    </div>
    <div class="border border-yellow-400"></div>
    <div 
      v-for="(playlistItem, index) in controller.store.queue.list.slice(controller.store.queue.list.length - maxDisplayedQueuesSongs, controller.store.queue.list.length).reverse()" 
      :key="`playlistitem-${index}`"
      class="grid grid-cols-1 gap-2 bg-gray-900 text-white bg-opacity-80"
    >
      <component
        :is="SongCard"
        :song="playlistItem.song"
      >
      </component>
    </div>
  </div>
</template>