<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { Song } from '@/components/mixins/IPimix'
import { formatDate, formatSeconds } from '@/components/mixins/tools'
import { REST_SERVER } from '../mixins/REST'
import { SongController } from '../controllers/SongController'
import { eventBus } from '../mixins/EventsManager'
import { shallowRef } from '@vue/reactivity'
import { defineAsyncComponent } from '@vue/runtime-core'

@Options({
  props: {
    params: Object,
    toolbar: Boolean,
    exclude: Array
  }
})
export default class SongTools extends Vue {
  controller = setup(() => SongController())
  // properties
  params: any
  toolbar: boolean
  exclude: String[]

  mounted () {
    console.log('songtools mounted')
  }

  created() {
  }

  get displayclass (): string {
    return !_.isNil(this.toolbar) && this.toolbar ? 'hidden' : ''
  }

  isDisplayed (_key: string): boolean {
    return !_.includes(this.exclude, _key)
  }

  addAsNext (): void {
    eventBus.emit('send', { command: 'queuenext', params: JSON.stringify({ songid: this.params?.song.id })})
  }

  vote (): void {
    eventBus.emit('send', { command: 'vote', params: JSON.stringify({ songid: this.params?.song.id })})
  }

  cleanHistory (): void {

  }

  removeSong (): void {

  }

  editSong (): void {

  }

  addToFavorites (): void {

  }

  addToPlaylist (): void {
    eventBus.emit('interface', { command: 'playlistmodal', params: { show: true, song: this.params?.song }})
  }
  
}
</script>

<template>
  <div
    v-if="params?.song"
    class="max-w lg:max-w-full lg:flex">
   
    <div class="flex-auto p-2">
      <div
        class="flex"
        :class="displayclass ? 'justify-between': 'ml-5 gap-1 flex-col'">
        <div v-if="isDisplayed('addnext')" class="flex" role="button" @click="addAsNext()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Jouer suivant</span>
        </div>
        <div v-if="isDisplayed('vote')" class="flex" role="button" @click="vote()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M14.467,1.771H5.533c-0.258,0-0.47,0.211-0.47,0.47v15.516c0,0.414,0.504,0.634,0.802,0.331L10,13.955l4.136,4.133c0.241,0.241,0.802,0.169,0.802-0.331V2.241C14.938,1.982,14.726,1.771,14.467,1.771 M13.997,16.621l-3.665-3.662c-0.186-0.186-0.479-0.186-0.664,0l-3.666,3.662V2.711h7.994V16.621z"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Voter</span>
        </div>
        <div v-if="isDisplayed('addplaylist')" class="flex" role="button" @click="addToPlaylist()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M15.396,2.292H4.604c-0.212,0-0.385,0.174-0.385,0.386v14.646c0,0.212,0.173,0.385,0.385,0.385h10.792c0.211,0,0.385-0.173,0.385-0.385V2.677C15.781,2.465,15.607,2.292,15.396,2.292 M15.01,16.938H4.99v-2.698h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.519,1.156-1.156s-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.321-1.089,0.771H4.99v-3.083h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.518,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V6.531h1.609C6.755,6.98,7.185,7.302,7.688,7.302c0.638,0,1.156-0.519,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V3.062h10.02V16.938z M7.302,13.854c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386s-0.173,0.385-0.385,0.385S7.302,14.066,7.302,13.854 M7.302,10c0-0.212,0.173-0.385,0.385-0.385S8.073,9.788,8.073,10s-0.173,0.385-0.385,0.385S7.302,10.212,7.302,10 M7.302,6.146c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386S7.899,6.531,7.688,6.531S7.302,6.358,7.302,6.146"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Ajouter à une playlist</span>
        </div>
        <div v-if="isDisplayed('favorites')" class="flex" role="button" @click="addToFavorites()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Ajouter aux favoris</span>
        </div>
        <div v-if="isDisplayed('delete')" class="flex" role="button" @click="removeSong()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Effacer</span>
        </div>
        <div v-if="isDisplayed('edit')" class="flex" role="button" @click="editSong()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Edition</span>
        </div>
        <div v-if="isDisplayed('clean')" class="flex" role="button" @click="cleanHistory()">
          <svg class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
          </svg>
          <span class="ml-2 text-sm font-medium" :class="displayclass">Effacer historique</span>
        </div>
      </div>
    </div>
  </div>
</template>