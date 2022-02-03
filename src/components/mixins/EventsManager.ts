import mitt, {Emitter} from "mitt"
import { PimixServer, Player, PlayList, PlayListItem, Vote } from "@/components/mixins/IPimix"

export type PimixEvent = {
  router: { status: boolean, attachedPimixId?: string }
  pimixserver: { list?: PimixServer[], current?: PimixServer }
  toast: string
  playlist: { action: string, playlist?: PlayList, item?: PlayListItem }
  vote: { action: string, votes?: Vote[], new?: Vote }
  player: { player: Player }
  container: { component: string, options?: any }
  send: { command: string, params?: string }
  interface: { command: string, params?: any }
  
}

export const eventBus: Emitter<PimixEvent> = mitt<PimixEvent>()