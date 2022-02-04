<script lang='ts'>
import { Options, setup, Vue } from 'vue-class-component'
import _ from 'lodash'

import { PlaylistController } from '@/components/controllers/PlaylistController'

import { eventBus } from '@/components/mixins/EventsManager'
import { DBError, DBResponse, Playlist, Song } from '@/components/mixins/IPimix'

import { DocumentAddIcon, BadgeCheckIcon as BadgeCheckIconSolid } from '@heroicons/vue/solid'
import { ViewListIcon, TrashIcon, BadgeCheckIcon as BadgeCheckIconOutline } from '@heroicons/vue/outline'

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'

@Options({
  components: { DocumentAddIcon, ViewListIcon, TrashIcon, BadgeCheckIconSolid, BadgeCheckIconOutline, TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle }
})
export default class ModalPlaylists extends Vue {
  modalController = setup(() => PlaylistController())

  song: Song
  editNewPlaylist: boolean = false
  newPlaylistName: string = ''

  mounted () {
    this.modalController.getList() // load playlits

    eventBus.on('interface', (_event) => {
      switch (_event.command) {
        case 'playlistmodal':
          this.editNewPlaylist = false
          this.song = _event.params.song as Song
          this.modalController.setState(_event.params.show)
        break
      }
    })
  }

  unmounted () {
    eventBus.off('interface')
  }

  closeModal (): void {
    this.modalController.setState(false)
  }

  createPlaylist (): void {
    this.modalController.createPlaylist(this.newPlaylistName, 1) // TODO set userid
      .then((result: DBResponse) => {
        if (result.success) {
          eventBus.emit('toast', { message: 'playlist.create.success', severity: 1 })
          this.modalController.getList()
        } else {
          _.forEach(result.errors, (error: DBError) => {
            eventBus.emit('toast', { message: error.message, severity: 4 })
          })
        }
      })
      .catch(() => {
        eventBus.emit('toast', { message: 'playlist.create.error', severity: 8 })
      }) 
  }

  deletePlaylist (_playlistId: number): void {
    this.modalController.deletePlaylist(_playlistId)
  }

  setSongToPlaylist (_playlist: Playlist, _state: boolean): void {
    const promises: Promise<DBResponse>[] = []
    if (_state) {
      promises.push(this.modalController.addSongToPlaylist(_playlist.id, this.song?.id))
    } else {
      promises.push(this.modalController.removeSongFromPlaylist(_playlist.id, this.song?.id))
    }

    Promise.all(promises)
      .then((results: DBResponse[]) => {
        this.modalController.getList()
        eventBus.emit('toast', { message: 'playlist.updated.success', severity: 1 })
      })
      .catch(() => {
        eventBus.emit('toast', { message: 'playlist.update.error', severity: 8 })
      })
  }

  isSongInPlaylist(_playlist: Playlist): boolean {
    return _.includes(_.map(_playlist.PlaylistSongs, (item: { songid: number }) => {
      return item.songid
    }), this.song?.id )
  }

  created() {
  }
}
</script>

<template>
  <TransitionRoot  appear :show="modalController.isModalDisplayed" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-flex flex-col w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border-2 border-gray-700"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ song?.title }}
              </DialogTitle>
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
                <div v-for="(playlist, index) in modalController.playlists" :key="`playlist-${index}`" class="flex" :class="isSongInPlaylist(playlist) ? 'font-bold text-green-500' : 'text-black'">
                  <BadgeCheckIconSolid v-if="isSongInPlaylist(playlist)" class="h-5 w-5 mr-2 text-green-500"/>
                  <BadgeCheckIconOutline v-else class="h-5 w-5 mr-2"/>
                  <span @click="setSongToPlaylist(playlist, !isSongInPlaylist(playlist))">{{ playlist.name }} ({{ playlist.PlaylistSongs.length }})</span>
                </div>
              </div>

              <div class="mt-4 ml-auto">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
                  Fermer
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>