<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { eventBus } from '@/mixins/EventsManager'

@Options({})
export default class Artists extends Vue {
  // controller = setup(() => SongsController())

  mounted () {
  }

  created() {
  }
}
</script>

<template>
  <div>
    Artists
  </div>
</template>