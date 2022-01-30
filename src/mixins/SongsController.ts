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

const getLastAdded = (_count: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve) => {
    request(`api/songs/last/${_count}`)
      .then((response: AxiosResponse) => {
        console.log('song controller', 'last', _count, response.data)

        resolve(_.map(response.data, (song) => {
          return song
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
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

  async function getLast (_count: number): Promise<Song[]> {
    return await getLastAdded(_count)
  }

  const getThumb = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/thumb/${_id}`
  }

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }
  
  return {
    controller,
    getList,
    getSong,
    getCover,
    getThumb,
    getLast
  }
}
