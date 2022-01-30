import mitt, {Emitter} from "mitt"
import { VueElement } from "vue"

export type PimixEvent = {
  header: { action: string, data?: any }
  container: { component: string }
}

export const eventBus: Emitter<PimixEvent> = mitt<PimixEvent>()