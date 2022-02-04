<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
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
    <component
      :is="SongIDCard"
      :params="params"
      class="bg-opacity-80">
    </component>
  </div>
 </template>