import {clone} from '@/core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
  updated: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
