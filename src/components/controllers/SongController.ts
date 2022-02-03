import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import { Song, SongLog } from "@/components/mixins/IPimix"
import { formatSeconds, formatDate } from "@/components/mixins/tools"
import { request, REST_SERVER } from "@/components/mixins/REST"
import { AxiosResponse } from "axios"

interface SongController {
  song: Song,
  id: number,
  title: string,
  album: string,
  duration: string,
  filepath: string,
  filename: string,
  size: number,
  ino: number,
  samplerate: number,
  bitrate: number,
  year: number,
  artists: string,
  genres: string,
  playcount: number,
  birth: string,
  createdAt: string,
  updatedAt: string,
  listenratio: number,
  votescount: number
}

const loadInfo = (_songid: number): Promise<Song> => {
  return new Promise<Song>((resolve) => {
    request(`api/song/info/${_songid}`)
      .then((response: AxiosResponse) => {
        resolve(response.data)
      })
      .catch(() => {
        resolve(null)
      })
  })
}

export const SongController = () => {

  const controller: SongController = reactive({
    song: null,
    title: computed(() => controller.song?.title),
    id: computed(() => controller.song?.id),
    album: computed(() => controller.song?.album),
    duration: computed(() => formatSeconds(controller.song?.duration)),
    filepath: computed(() => controller.song?.filepath),
    filename: computed(() => controller.song?.filename),
    size: computed(() => (controller.song?.size / 1048576)), // octets to Megaoctets (notation before 1998)
    ino: computed(() => controller.song?.ino),
    samplerate: computed(() => controller.song?.samplerate),
    bitrate: computed(() => controller.song?.bitrate / 1000),
    year: computed(() => controller.song?.year),
    artists: computed(() => _.map(controller.song?.Artists, 'name').join(', ')),
    genres: computed(() => _.map(controller.song?.Genres, 'name').join(', ')),
    playcount: computed(() => controller.song?.SongLogs.length),
    birth: computed(() => formatDate(controller.song?.birth)),
    createdAt: computed(() => formatDate(controller.song?.createdAt, false)),
    updatedAt: computed(() => formatDate(controller.song?.createdAt, false)),
    listenratio: computed(() => _.meanBy(controller.song?.SongLogs, 'listenratio') * 100),
    votescount: computed(() => _.filter(controller.song?.SongLogs, (log: SongLog) => { return log.origin === 'vote' }).length)
  })

  async function loadInfos (_songid: number) {
    controller.song = await loadInfo(_songid)
  }

  const getThumb = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/thumb/${_id}`
  }

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }

  return {
    loadInfos,
    controller,
    getThumb,
    getCover
  }
}