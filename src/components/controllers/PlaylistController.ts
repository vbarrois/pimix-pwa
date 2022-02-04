import { computed, reactive, inject } from "vue"
import _ from 'lodash'
import { PimixStore, Playlist, Vote } from "@/components/mixins/IPimix"
import { AxiosResponse } from "axios"
import { put, request } from "@/components/mixins/REST"

interface PlaylistController {
  store: PimixStore,
  isModalDisplayed: boolean,
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
    isModalDisplayed: false,
    playlists: []
  })

  async function getList () {
    controller.playlists = await loadPlaylists()
  }

  async function createPlaylist (_name: string, _userid: number) {
    await savePlaylist(_name, _userid)
    await getList()
  }

  async function setState (_modalState: boolean) {
    controller.isModalDisplayed = _modalState
  }

  return {
    votes: computed(() => { 
      return _.orderBy(controller.store.votes, [
        (vote: Vote) => { return vote.points },
        (vote: Vote) => { return vote.createdAt }
      ], [
        'asc', 'desc'
      ])
    }),
    queue: computed(() => controller.store.queue),
    playlists: computed(() => { return controller.playlists }),
    setState,
    getList,
    createPlaylist,
    isModalDisplayed: computed(() => controller.isModalDisplayed)
  }
}