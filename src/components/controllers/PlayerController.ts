import { computed, reactive, inject } from "vue"
import _ from 'lodash'

import { PimixStore, Song, Track } from "@/components/mixins/IPimix"
import { REST_SERVER } from "@/components/mixins/REST"

interface PlayerController {
  store: PimixStore,
  activeTrackId: number,
  activeTrack: Track,
  activeSong: Song,
  elapsed: number,
  duration: number,
  seeklength: number,
  seekmode: number,
  leavelength: number,
  leavemode: number,
  progress: number,
  progressbar: {
    start: number,
    position: number,
    end: number
  }
}

export const PlayerController = () => {

  const controller: PlayerController = reactive({
    store: inject('Store') as PimixStore,
    activeTrackId: computed(() => {
      return controller.store.server?.activetrack - 1
    }),
    activeTrack: computed(() => {
      return controller.store.tracks[controller.activeTrackId]
    }),
    activeSong: computed(() => {
      return controller.activeTrack?.item.song
    }),
    elapsed: computed(() => {
      return controller.activeTrack?.elapsed
    }),
    duration: computed(() => {
      return controller.activeSong?.duration
    }),
    seeklength: computed(() => {
      return controller.store.server?.seeklength
    }),
    seekmode: computed(() => {
      return controller.store.server?.seekmode
    }),
    leavelength: computed(() => {
      return controller.store.server?.leavelength
    }),
    leavemode: computed(() => {
      return controller.store.server?.leavemode
    }),
    progress: computed(() => {
      return 100 * (controller.elapsed / controller.duration)
    }),
    progressbar: computed(() => {
      var spospc = 0
      switch (controller.seekmode) {
        case 0: {
          spospc = 0
          break
        }
        case 1: {
          spospc = 100 * controller.seeklength / controller.duration
          break
        }
        case 2: {
          spospc = controller.seeklength
          break
        }
      }
      var seekduration = controller.duration * (spospc / 100)
      var lpospc = 0
      const leavemode = controller.leavemode
      switch (leavemode) {
        case 0: {
          lpospc = 100
          break
        }
        case 1: {
          lpospc = 100 * (seekduration + controller.leavelength) / controller.duration
          break
        }
        case 2: {
          lpospc = controller.leavelength
          break
        }
      }
      return {
        start: spospc,
        position: controller.progress,
        end:lpospc
      }
    })
  })

  const getCover = (_id: number): string => {
    return `http://${REST_SERVER}/api/song/cover/${_id}`
  }

  return {
    controller,
    getCover
  }
}