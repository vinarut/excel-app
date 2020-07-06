import {defaultStyles} from '@/constants'
import {toInlineStyle} from '@/core/utils'
import {parse} from '@/core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, col) {
  return (state.colState[col] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, row) {
  return (state.rowState[row] || DEFAULT_HEIGHT) + 'px'
}

function getText(state, id) {
  return state.dataState[id] || ''
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(state, col)
    const id = `${row}:${col}`
    const styles = toInlineStyle({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    const value = getText(state, id)

    return `
      <div
        class="cell" 
        contenteditable 
        data-type="cell"
        data-col="${col}" 
        data-id="${id}"
        data-value="${value}"
        style="${styles};width:${width}"
      >${parse(value)}</div>
    `
  }
}

function toColumn(state) {
  return function(col, index) {
    const width = getWidth(state, index)
    return `
      <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width:${width}"
      >${col}<div class="col-resize" data-resize="col"></div></div>
    `
  }
}

function createRow(content, index = '', state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const heigth = getHeight(state, index)

  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}" 
      style="height:${heigth}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(state))
      .join('')

  rows.push(createRow(cols, null, state))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')

    rows.push(createRow(cells, row + 1, state))
  }

  return rows.join('')
}
