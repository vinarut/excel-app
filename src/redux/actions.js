import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  CHANGE_UPDATED
} from './types'

export function tableResize(data) {
  return {
    data,
    type: TABLE_RESIZE
  }
}

export function changeText(data) {
  return {
    data,
    type: CHANGE_TEXT
  }
}

export function changeStyles(data) {
  return {
    data,
    type: CHANGE_STYLES
  }
}

export function applyStyle(data) {
  return {
    data,
    type: APPLY_STYLE
  }
}

export function changeTitle(data) {
  return {
    data,
    type: CHANGE_TITLE
  }
}

export function changeUpdated() {
  return {
    type: CHANGE_UPDATED
  }
}
