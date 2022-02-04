import mitt, {Emitter} from "mitt"
import { PimixServer, Player, Queue, QueueItem, Vote } from "@/components/mixins/IPimix"

export type PimixEvent = {
  router: { status: boolean, attachedPimixId?: string }
  pimixserver: { list?: PimixServer[], current?: PimixServer }
  toast: string
  queue: { action: string, queue?: Queue, item?: QueueItem }
  vote: { action: string, votes?: Vote[], new?: Vote }
  player: { player: Player }
  container: { component: string, options?: any }
  send: { command: string, params?: string }
  interface: { command: string, params?: any }
}

export const eventBus: Emitter<PimixEvent> = mitt<PimixEvent>()