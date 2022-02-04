export class DBError {
  path: string // field name
  key: string // function check name
  message: string // error message
}

export class DBResponse {
  success: boolean
  object: any
  errors: DBError[]
}

export class Page {
  name: string
  template: any
}

export class PimixStore {
  connected: boolean
  queue: Queue
  votes: Vote[]
  servers: PimixServer[]
  server: PimixServer
  tracks: Track[]
}

export class SongLog {
  id: number
  sessionid: string
  songid: number
  listenratio: number
  origin: string
  createdAt: string
  updatedAt: string
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
  Artists: Artist[]
  SongLogs: SongLog[]
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

export interface QueueItem {
  uuid: string
  createdAt: string
  executed?: boolean
  origin?: string
  points?: number,
  song?: Song
}

export interface Queue {
  playingUUID: string,
  list: QueueItem[]
}

// same as playlist item for now !?
export interface Vote {
  uuid: string
  createdAt: string
  executed?: boolean
  origin?: string
  points?: number,
  song?: Song,
  votes: UserVote[]
}

export interface UserVote {
  userid: number
  username: string
  points: number
}

export interface Player {
  num: number // Piste
  track: Track
}

export interface Track {
  elapsed: number
  item: {
    song: Song
    active: boolean
    state: string
    skipped: number
  }
}

export interface Playlist {
  id: number
  name: string
  public: number
  userid: number,
  PlaylistSongs: { songid: number }[]
}

export interface PlaylistSong {
  id: number
  playlistid: number
  songid: number
  createdAt: string
  updatedAt: string
}