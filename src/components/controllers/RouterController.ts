import { io, Socket } from 'socket.io-client'
import { inject } from 'vue'
import _ from 'lodash'
import { eventBus } from '@/components/mixins/EventsManager'
import { PimixServer, PimixStore, Player, Queue, QueueItem, Song, Vote } from '@/components/mixins/IPimix'

const subscribedMessage = [
  'serverlist',
  'playlist_init',
  'playlist_add',
  'playlist_index',
  'votes_init',
  'vote',
  'attached',
  'track',
  'mixer',
  'message'
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
    switch (_message) {
      case 'serverlist': {
        this.pimixList = _.map(JSON.parse(_content), (server: PimixServer) => server)
        // check if attached pimix is in server list, else detach (pimix player shutdown)
        if (!_.isNil(this.attachedPimixId) && !_.includes(_.map(this.pimixList, 'id'), this.attachedPimixId)) {
          this.attachedPimixId = null
          eventBus.emit('router', { status: true, attachedPimixId: null })
        }
        // if not connected to pimix player, and one is available, automaticaly connect to first from list
        if (_.isNil(this.attachedPimixId) && this.pimixList.length > 0) {
          this.socket.emit('map', this.pimixList[0].id)
        }
        eventBus.emit('pimixserver', { list: this.pimixList })
        break
      }
      case 'mixer': {
        console.log(`message ${_message} received with content ${_content}`)
        const mixerState: PimixServer = JSON.parse(_content)
        eventBus.emit('pimixserver', { current: mixerState })
        break
      }
      case 'attached': {
        this.attachedPimixId = (JSON.parse(_content) as PimixServer).id
        eventBus.emit('router', { status: true, attachedPimixId: this.attachedPimixId })
        break
      }
      case 'detached': {
        eventBus.emit('router', { status: true, attachedPimixId: null })
        this.attachedPimixId = null
        break
      }
      case 'playlist_init': {
        const queuetInit: Queue = JSON.parse(_content)
        eventBus.emit('queue', { action: 'init', queue: queuetInit })
        break
      }
      case 'playlist_add': {
        const newItem: QueueItem = JSON.parse(_content).item
        eventBus.emit('queue', { action: 'add', item: newItem })
        break
      }
      case 'votes_init': {
        const votesInit: Vote[] = JSON.parse(_content)
        eventBus.emit('vote', { action: 'init', votes: votesInit })
        break
      }
      case 'vote': {
        const newVote: Vote = JSON.parse(_content)
        eventBus.emit('vote', { action: 'new', new: newVote })
        break
      }
      case 'track': {
        const playerState: Player = JSON.parse(_content)
        eventBus.emit('player', { player: playerState })
        break
      }
      case 'message': {
        eventBus.emit('toast', _content)
        break
      }
    }
  }

  public sendCommand (_command: string, _params?: string): void {
    this.socket.emit('command', {
      action: _command
    })
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
        this.disconnect(false) // dont close socket for reconnection 
        eventBus.emit('router', { status: false })
        this.connected = false
      })
    }
  }

  public disconnect (_closeSocket: boolean = false) {
    // lost connection, clean attached events (fix the hmr reload make the events duplicated)
    _.forEach(subscribedMessage, (message) => {
      this.socket.off(message)
    })
    if (_closeSocket) this.socket.close()
  }

  public isConnected (): boolean {
    return !_.isNil(this.socket) && this.socket.connected 
  }
}