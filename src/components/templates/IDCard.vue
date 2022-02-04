<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import SongIDCard from '@/components/cards/SongIDCard.vue'

@Options({
  props: {
    params: Object
  },
  components: { SongIDCard }
})
export default class Player extends Vue {
  params: any

  mounted () {
  }

  created() {
    console.log('song ID card created', this.params?.song)
  }
}
</script>

<template>
  <div class="text-white">
    <SongIDCard
      :params="params"
      class="bg-opacity-80"/>
  </div>
 </template>