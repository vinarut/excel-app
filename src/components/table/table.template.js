const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, index) {
  return `<div class="cell" contenteditable data-col="${index}"></div>`
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowIndex = '') {
  const resize = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowIndex}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  return createRow(cols) + new Array(rowsCount)
      .fill(cells)
      .map((cell, index) => createRow(cell, index + 1))
      .join('')
}
