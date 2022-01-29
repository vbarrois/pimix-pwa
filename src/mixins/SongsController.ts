import { AxiosResponse } from 'axios'
import _ from 'lodash'
import { computed, reactive } from 'vue'
import { request, REST_SERVER } from './REST'
import { Song } from './IPimix'

interface SongListController {
  songs: Song[]
  count: number
}

const loadSongs = (): Promise<Song[]> => {
  return new Promise<Song[]>((resolve) => {
    request('api/songs')
      .then((response: AxiosResponse) => {
        resolve(_.map(response.data, (data: Song) => {
          return data
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
}

const loadSong = (_id: number): Promise<Song> => {
  return new Promise<Song>((resolve) => {
    request(`api/song/${_id}`)
      .then((response: AxiosResponse) => {
        resolve(response.data)
      })
      .catch(() => {
        resolve(null)
      })
  })
}

const getCoverURL = (_id: number): string => {
  return `http://${REST_SERVER}/api/song/thumb/${_id}`
}

export const SongsController = () => {
  const controller: SongListController = reactive({
    songs: [],
    count: computed(() => controller.songs.length)
  })

  async function getList () {
    controller.songs = await loadSongs()
  }

  async function getSong (_id: number): Promise<Song> {
    return await loadSong(_id)
  }

  return {
    controller,
    getList,
    loadSong,
    getCoverURL
  }
}
