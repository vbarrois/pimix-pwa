import mitt, {Emitter} from "mitt"
import { PimixServer, PlayList, PlayListItem } from "./IPimix"

export type PimixEvent = {
  router: { status: boolean, attachedPimixId?: string }
  playlist: { action: string, playlist?: PlayList, item?: PlayListItem }
  pimixserver: { list: PimixServer[] }
  header: { action: string, data?: any }
  container: { component: string }
}

export const eventBus: Emitter<PimixEvent> = mitt<PimixEvent>()