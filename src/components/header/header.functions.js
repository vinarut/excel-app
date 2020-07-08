import {$} from '@core/dom'

export function isDelete(event) {
  return $(event.target).data.type === 'del'
}

export function isExit(event) {
  return $(event.target).data.type === 'exit'
}
