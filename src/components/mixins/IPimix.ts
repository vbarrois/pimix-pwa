export interface PimixStore {
  playlist: PlayList
}

export interface Artist {
  id: number
  name: string
  state: boolean
  spotifyId: string
  popularity: number
  followers: number
  songscount: number
  yearfrom: number
  yearto: number
  createdAt: string
  updatedAt: string
}

export interface Genre {
  id: number
  name: string
  state: boolean
  songscount: number
  yearfrom: number
  yearto: number
  createdAt: string
  updatedAt: string
}

export interface Song {
  id: number
  filepath: string
  filename: string
  title: string
  album: string
  year: number
  bitrate: number
  duration: number
  samplerate: number
  size: number
  ino: number
  birth: string
  createdAt: string
  updatedAt: string
  Genres: Genre[]
  Artits: Artist[]
}

export interface PimixServer {
  id: string
  sessionid: string
  name: string
  nbtracks: number
  activetrack: number
  playonstart: boolean
  shuffle: boolean
  gain: number
  volume: number
  seekmode: number
  seeklength: number
  leavemode: number
  leavelength: number
  fadeinduration: number
  fadeoutduration: number
  nbclient: number
}

export interface PlayListItem {
  uuid: string
  createdAt: string
  executed?: boolean
  origin?: string
  points?: number,
  song?: Song
}

export interface PlayList {
  playingUUID: string,
  list: PlayListItem[]
}