<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { eventBus } from '@/components/mixins/EventsManager'

@Options({})
export default class Settings extends Vue {
  // controller = setup(() => SongsController())

  mounted () {
  }

  created() {
  }
}
</script>

<template>
  <div>
    Settings
  </div>
</template>