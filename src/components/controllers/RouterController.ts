import { io, Socket } from 'socket.io-client'
import { inject } from 'vue'
import _ from 'lodash'
import { eventBus } from '@/components/mixins/EventsManager'
import { PimixServer, PimixStore, PlayList, PlayListItem, Song } from '@/components/mixins/IPimix'

const subscribedMessage = [
  'serverlist',
  'playlist_init',
  'playlist_add',
  'playlist_index',
  'votes_init',
  'vote',
  'attached'
]

export class RouterController {

  private url: string = 'http://192.168.188.101:82' // eslint-disable-line @typescript-eslint/restrict-plus-operands

  protected socket: Socket = null
  protected connected: boolean = false

  protected pimixList: PimixServer[] = []
  protected attachedPimixId?: string = null

  protected user = {
    id: 0,
    username: 'anonymous',
    rights: 0
  }

  protected binding = {
    component: 'interface', // component name
    user: this.user
  }

  private parseMessage(_message: string, _content) {
    console.log(`message ${_message} received with content ${_content}`)
    switch (_message) {
      case 'serverlist': {
        this.pimixList = _.map(JSON.parse(_content), (server: PimixServer) => server)
        // check if attached pimix is in server list, else detach (pimix player shutdown)
        if (!_.isNil(this.attachedPimixId) && !_.includes(_.map(this.pimixList, 'id'), this.attachedPimixId)) {
          this.attachedPimixId = null
          console.log('emit => pimix not found')
          eventBus.emit('router', { status: true, attachedPimixId: null })
        }
        // if not connected to pimix player, and one is available, automaticaly connect to first from list
        if (_.isNil(this.attachedPimixId) && this.pimixList.length > 0) {
          console.log(`socket map to ${this.pimixList[0].id}`)
          this.socket.emit('map', this.pimixList[0].id)
        }
        eventBus.emit('pimixserver', { list: this.pimixList })
        break
      }
      case 'attached': {
        this.attachedPimixId = (JSON.parse(_content) as PimixServer).id
        console.log('emit => attached')
        eventBus.emit('router', { status: true, attachedPimixId: this.attachedPimixId })
        break
      }
      case 'detached': {
        console.log('dettached from ' + _content)
        eventBus.emit('router', { status: true, attachedPimixId: null })
        this.attachedPimixId = null
        break
      }
      case 'playlist_init': {
        const playlistInit: PlayList = JSON.parse(_content)
        eventBus.emit('playlist', { action: 'init', playlist: playlistInit })
      }
      case 'playlist_add': {
        const newItem: PlayListItem = JSON.parse(_content)
        eventBus.emit('playlist', { action: 'add', item: newItem })
      }
    }
    console.log(this.pimixList)
  }

  public connect () {
    this.socket = io(this.url, {
      upgrade: false,
      transports: ['websocket'],
      reconnection: true,
      forceNew: false,
      query: {
        binding: JSON.stringify(this.binding)
      }
    })

    if (!_.isNil(this.socket)) {
      this.socket.on('connect', () => {
        // router connected
        console.log('emit socket connect')
        eventBus.emit('router', { status: true })
        this.connected = true
        // subscribe to messages
        _.forEach(subscribedMessage, (message) => {
          this.socket.on(message, (_event: string) => {
            this.parseMessage(message, _event)
          })
        })
      })
      this.socket.on('error', () => {
        // connection error
        console.log('emit socket error')
        eventBus.emit('router', { status: false })
        this.connected = false
      })
      this.socket.on('disconnect', () => {
        // disconnected, unsubscribed all events
        this.disconnect()
        eventBus.emit('router', { status: false })
        this.connected = false
        this.socket.close()
      })
    }
  }

  public disconnect () {
    // lost connection, clean attached events (fix the hmr reload make the events duplicated)
    _.forEach(subscribedMessage, (message) => {
      this.socket.off(message)
    })
  }

  public isConnected (): boolean {
    return !_.isNil(this.socket) && this.socket.connected 
  }
}