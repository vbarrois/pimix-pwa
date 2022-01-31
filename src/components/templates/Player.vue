<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { eventBus } from '@/mixins/EventsManager'

@Options({})
export default class Player extends Vue {
  // controller = setup(() => SongsController())

  mounted () {
  }

  created() {
  }
}
</script>

<template>
  <div>
    Player
  </div>
</template>