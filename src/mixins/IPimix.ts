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