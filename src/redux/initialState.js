import {storage} from '@/core/utils'
import {defaultStyles} from '../constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: ''
}

const normalize = state => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles
})

export const initialState = storage('excel-app')
  ? normalize(storage('excel-app'))
  : defaultState
