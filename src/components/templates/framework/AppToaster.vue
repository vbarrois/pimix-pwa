<script lang='ts'>
import { Options, Vue, setup } from 'vue-class-component'
import { eventBus } from '@/components/mixins/EventsManager'
import { ToasterController } from '@/components/controllers/ToasterController'


@Options({})
export default class AppToaster extends Vue {
  controller = setup(() => ToasterController())

  mounted () {
    eventBus.on('toast', (_content) => {
      this.controller.push(_content)
    })
  }

  unmounted () {
    eventBus.off('toast')
  }

  created() {
  }
}
</script>

<template>
  <div class="absolute w-full top-0 z-50 mt-3 flex flex-col p-1 gap-1">
    <div
      v-for="(toast, index) in controller.toasts"
      :key="`toast-${index}`"
      class="bg-white shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block animate-bounce"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-mdb-autohide="false">
      <div
        class="flex p-2 rounded-lg text-white"
        :class="toast.classname">
        <svg aria-hidden="true" focusable="false" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            v-if="toast.severity === 1"
            fill="currentColor"
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
          <path
            v-else-if="toast.severity === 8"
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
          <path 
            v-else
            fill="currentColor"
            d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path> -->
        </svg>
        <span class="text-center break-words font-extrabold">
          {{ toast.message }}
        </span>
      </div>
    </div>
  </div>
</template>