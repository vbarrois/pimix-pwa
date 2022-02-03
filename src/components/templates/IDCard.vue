<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import SongIDCard from '@/components/cards/SongIDCard.vue'
import { shallowRef } from '@vue/reactivity'
import { defineAsyncComponent } from '@vue/runtime-core'

@Options({
  props: {
    params: Object
  }
})
export default class Player extends Vue {
  params: any

  SongIDCard = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/cards/SongIDCard.vue')
    )
  )

  mounted () {
  }

  created() {
    console.log('created', this.params)
  }
}
</script>

<template>
  <div class="text-white">
    <div>Play next</div>
    <div>Vote</div>
    <div>Add to playlist</div>
    <div>Add to favorites</div>
    <div>Delete</div>
    <div>Edit properties</div>
    <div>Effacer historique de lecture</div>
    
    
    <component
      :is="SongIDCard"
      :params="params"
      class="bg-opacity-80">
    </component>
  </div>
 </template>