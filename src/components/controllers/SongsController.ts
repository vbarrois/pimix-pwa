import { AxiosResponse } from 'axios'
import _ from 'lodash'
import { computed, reactive } from 'vue'
import { request, REST_SERVER } from '@/components/mixins/REST'
import { Song } from '@/components/mixins/IPimix'

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

export const SongsController = () => {
  const controller: SongListController = reactive({
    songs: [],
    count: computed(() => controller.songs.length)
  })

  async function getList () {
    controller.songs = await loadSongs()
  }

  const getThumb = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/thumb/${_id}`
  }

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }
  
  return {
    songs: computed(() => controller.songs),
    getList,
    getCover,
    getThumb
  }
}
