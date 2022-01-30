import { AxiosResponse } from 'axios'
import _ from 'lodash'
import { computed, reactive } from 'vue'
import { request, REST_SERVER } from './REST'
import { Song } from './IPimix'

interface DashboardController {
  lastadded: Song[]
  lastplayed: any[] // playedDate added
  mostplayed: any[] // count added
  mostswipped: any[] // ratio added
}

const requestLastAdded = (_count: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve) => {
    request(`api/songs/last/${_count}`)
      .then((response: AxiosResponse) => {
        resolve(_.map(response.data, (song) => {
          return song
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
}

const requestMostPlayed = (_count: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve) => {
    request(`api/log/mostplayed/${_count}`)
      .then((response: AxiosResponse) => {
        resolve(_.map(response.data, (song) => {
          return song
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
}

const requestMostSwipped = (_count: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve) => {
    request(`api/log/mostswipped/${_count}`)
      .then((response: AxiosResponse) => {
        resolve(_.map(response.data, (song) => {
          return song
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
}

const requestLastPlayed = (_count: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve) => {
    request(`api/log/lastplayed/${_count}`)
      .then((response: AxiosResponse) => {
        resolve(_.map(response.data, (song) => {
          return song
        }))
      })
      .catch(() => {
        resolve([])
      })
  })
}

export const DashboardController = () => {
  const controller: DashboardController = reactive({
    lastadded: [],
    lastplayed: [],
    mostplayed: [],
    mostswipped: []
  })

  async function getLastAdded (_count: number) {
    controller.lastadded = await requestLastAdded(_count)
  }

  async function getMostPlayed (_count: number) {
    controller.mostplayed = await requestMostPlayed(_count)
  }

  async function getMostSwipped (_count: number) {
    controller.mostswipped = await requestMostSwipped(_count)
  }

  async function getLastPlayed (_count: number) {
    controller.lastplayed = await requestLastPlayed(_count)
  }

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }

  return {
    controller,
    getLastAdded,
    getMostPlayed,
    getMostSwipped,
    getLastPlayed,
    getCover
  }
}
