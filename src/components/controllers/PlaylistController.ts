import { computed, reactive, inject } from "vue"
import _ from 'lodash'
import { PimixStore, Playlist } from "@/components/mixins/IPimix"
import { AxiosResponse } from "axios"
import { put, request } from "@/components/mixins/REST"

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'

interface PlaylistController {
  store: PimixStore,
  show: boolean,
  playlists: Playlist[]
}

const loadPlaylists = (): Promise<Playlist[]> => {
  return new Promise<Playlist[]>((resolve) => {
    request('api/playlists')
      .then((response: AxiosResponse) => {
        resolve(_.map(response.data, (data: Playlist) => {
          return data
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
}

const savePlaylist = (_name, _userid): Promise<Playlist> => {
  return new Promise<Playlist>((resolve) => {
    put('api/playlist', {
      name: _name,
      userid: _userid
    })
      .then((response: AxiosResponse) => {
        resolve(response.data as Playlist)
      })
      .catch(() => {
        resolve(null)
      })
  })
}


export const PlaylistController = () => {

  const controller: PlaylistController = reactive({
    store: inject('Store') as PimixStore,
    show: false,
    playlists: []
  })

  async function getList () {
    controller.playlists = await loadPlaylists()
  }

  async function createPlaylist (_name: string, _userid: number) {
    await savePlaylist(_name, _userid)
    await getList()
  }
  return {
    store: controller.store,
    controller,
    getList,
    createPlaylist,
    TransitionChild,
    TransitionRoot,
    Dialog,
    DialogOverlay,
    DialogTitle
  }
}