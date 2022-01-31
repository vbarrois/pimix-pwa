<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { AppController } from '@/components/controllers/AppController'

@Options({})
export default class App extends Vue {
  controller = setup(() => AppController())

  mounted() {
    this.controller.connect()
    import.meta.hot.dispose(() => {
      // cleanup side effect on hmr reload
      this.controller.disconnect()
    })
  }

  beforeDestroy () {
  }
  
}
</script>

<template>
  <main class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex max-w-30 bg-gray-900">
        <component :is="controller.AppMenu"></component>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="flex h-14 p-2"><component :is="controller.AppHeader"></component></div>
        <div class="flex flex-1 overflow-y-auto paragraph px-4"><component :is="controller.AppContainer"></component></div>
        <div class="flex h-5 bg-gray-900"><component :is="controller.AppFooter"></component></div>
      </div>
    </div>
  </main>
</template>
