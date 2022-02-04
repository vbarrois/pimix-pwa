import { computed, reactive, inject } from "vue"
import _ from 'lodash'
import { DBError, DBResponse, PimixStore, Playlist, Song, Vote } from "@/components/mixins/IPimix"
import { AxiosResponse } from "axios"
import { put, request, remove, post } from "@/components/mixins/REST"

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

const savePlaylist = (_name: string, _userid: number): Promise<DBResponse> => {
  return new Promise<DBResponse>((resolve) => {
    put('api/playlist', {
      name: _name,
      userid: _userid
    })
      .then((response: AxiosResponse) => {
        resolve(response.data as DBResponse)
      })
      .catch(() => {
        resolve(null)
      })
  })
}

const removePlaylist = (_id: number): Promise<Playlist> => {
  return new Promise<Playlist>((resolve) => {
    remove('api/playlist', {
      id: _id
    })
      .then((response: AxiosResponse) => {
        resolve(response.data as Playlist)
      })
      .catch(() => {
        resolve(null)
      })
  })
}

const addPlaylistSong = (_playlistId: number, _songId: number): Promise<DBResponse> => {
  return new Promise<DBResponse>((resolve, reject) => {
    put('api/playlistsong', {
      playlistid: _playlistId,
      songid: _songId
    })
      .then((response: AxiosResponse) => {
        resolve(response.data as DBResponse)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const removePlaylistSong = (_playlistId: number, _songId: number): Promise<DBResponse> => {
  return new Promise<DBResponse>((resolve, reject) => {
    remove('api/playlistsong', {
      playlistid: _playlistId,
      songid: _songId
    })
      .then((response: AxiosResponse) => {
        resolve(response.data as DBResponse)
      })
      .catch((err) => {
        reject(err)
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

  async function createPlaylist (_name: string, _userid: number): Promise<DBResponse> {
    return savePlaylist(_name, _userid)
  }

  async function deletePlaylist (_id: number) {
    await removePlaylist(_id)
    await getList()
  }

  async function addSongToPlaylist (_playlistId: number, _songId: number): Promise<DBResponse> {
    return addPlaylistSong(_playlistId, _songId)
  }

  async function removeSongFromPlaylist (_playlistId: number, _songId: number) {
    return removePlaylistSong(_playlistId, _songId)
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
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    isModalDisplayed: computed(() => controller.isModalDisplayed)
  }
}