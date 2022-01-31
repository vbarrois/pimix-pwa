import mitt, {Emitter} from "mitt"
import { PimixServer, PlayList, PlayListItem } from "@/components/mixins/IPimix"

export type PimixEvent = {
  router: { status: boolean, attachedPimixId?: string }
  pimixserver: { list: PimixServer[] }
  playlist: { action: string, playlist?: PlayList, item?: PlayListItem }
  header: { action: string, data?: any }
  container: { component: string }
}

export const eventBus: Emitter<PimixEvent> = mitt<PimixEvent>()