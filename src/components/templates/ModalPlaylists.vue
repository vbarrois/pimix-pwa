<script lang='ts'>
import { Options, setup, Vue } from 'vue-class-component'
import { PlaylistController } from '../controllers/PlaylistController'
import { eventBus } from '../mixins/EventsManager'
import { Song } from '../mixins/IPimix'
import { DocumentAddIcon } from '@heroicons/vue/solid'
import { ViewListIcon } from '@heroicons/vue/outline'
import { reactive, ref } from '@vue/reactivity'

@Options({
  components: { DocumentAddIcon, ViewListIcon }
})
export default class ModalPlaylists extends Vue {
  modalController = setup(() => PlaylistController())

  song: Song
  editNewPlaylist: boolean = false
  newPlaylistName: string

  mounted () {
    this.modalController.controller.show = false
    this.modalController.getList() // load playlits

    eventBus.on('interface', (_event) => {
      switch (_event.command) {
        case 'playlistmodal':
          this.editNewPlaylist = false
          this.song = _event.params.song as Song
          this.modalController.controller.show = _event.params.show
        break
      }
    })
  }

  unmounted () {
    eventBus.off('interface')
  }

  closeModal (): void {
    this.modalController.controller.show = false
  }

  createPlaylist (): void {
    this.modalController.createPlaylist(this.newPlaylistName, 1) // TODO set userid
  }

  created() {
  }
}
</script>

<template>
  <component :is="modalController.TransitionRoot"  appear :show="modalController.controller.show" as="template">
    <component :is="modalController.Dialog" as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <component
            :is="modalController.TransitionChild"
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <component :is="modalController.DialogOverlay" class="fixed inset-0" />
          </component>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <component
            :is="modalController.TransitionChild"
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <component
                :is="modalController.DialogTitle"
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ song?.title }}
              </component>
              <div class="mt-2">
                <div v-if="!editNewPlaylist" class="mb-4 flex" @click="editNewPlaylist = true"><DocumentAddIcon class="h-5 w-5 mr-2"/>Nouvelle playlist</div>
                <div v-else class="mb-4 flex">
                  <form class="w-full max-w-lg">
                  <div class="mb-4">
                    <div class="flex">
                      <input id="playlistname" v-model="newPlaylistName" class="py-1 px-2 text-md border border-blue-lighter rounded-l" type="text" placeholder="Nouvelle playlist">
                      <button class="w-8 flex items-center justify-center border-t border-r border-b rounded-r border-black bg-black text-white" @click="createPlaylist()">+</button>
                    </div>
                  </div>
                  </form>
                </div>
                <div v-for="(playlist, index) in modalController.controller.playlists" :key="`playlist-${index}`" class="flex">
                  <ViewListIcon class="h-5 w-5 mr-2"/>{{ playlist.name }}
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </component>
        </div>
      </div>
    </component>
  </component>
</template>