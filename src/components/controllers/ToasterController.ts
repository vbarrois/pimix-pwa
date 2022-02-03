import _ from 'lodash'
import { computed, reactive, inject } from "vue"

interface ToasterController {
  toasts: Toast[]
  mode: number
}

export const ToasterController = () => {

  const controller: ToasterController = reactive({
    toasts: [],
    mode: 13
  })

  const push = (json: string): void => {
    const toast: Toast = new Toast(json)
    if (toast.isMode(controller.mode)) {
      controller.toasts.unshift(toast)
      toast.show(2000, clean)
    }
  }

  const clean = (): void => {
    _.remove(controller.toasts, (t) => { return !t.isalive })
  }

  return {
    toasts: controller.toasts,
    push
  }
}

export class Toast {
  protected message: string = ''
  protected severity: number = 0
  protected alive: boolean = true
  constructor (json: string) {
    const { message, severity } = JSON.parse(json)
    this.message = message
    this.severity = severity
  }

  public show (timeout: number, _callback: () => void ): void {
    setTimeout(() => {
      this.alive = false
      _callback()
    }, timeout)
  }

  public isMode (mode: number): boolean {
    return (this.severity & mode) > 0
  }

  public get classname (): string {
    switch (this.severity) {
      case 1: return 'bg-green-500'
      case 2: return 'bg-yellow-500'
      case 4: return 'bg-orange-500'
      case 8: return 'bg-red-500'
      default: return 'bg-green-500'
    }
  }

  public get isalive (): boolean {
    return this.alive
  }
}
