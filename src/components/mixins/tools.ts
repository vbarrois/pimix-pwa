import days from 'dayjs'
import _ from 'lodash'

export const formatSeconds = (_time: number): string => {
  if (!_.isNil(_time)) {
    let totalSeconds: number = _time
    // let hours:number = Math.floor( totalSeconds / 3600);
    totalSeconds %= 3600
    const minutes: string = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const seconds: string = Math.ceil(totalSeconds % 60).toString().padStart(2, '0')
    return minutes + ':' + seconds
  }
}

export const formatDate = (_date: string, _timeSameDay: boolean = false): string => {
  if (!_.isNil(_date)) {
    days.locale('fr')
    const today = new Date()
    const date = new Date(_date)
    if (_timeSameDay && date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
      return days(_date).format("hh:mm")
    } else {
      return days(_date).format("D MMM YY")
    }
  }
}