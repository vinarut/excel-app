const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `<div class="cell" contenteditable></div>`
}

function toColumn(col) {
  return `<div class="column">${col}</div>`
}

function createRow(content, rowIndex = '') {
  return `
    <div class="row">
      <div class="row-info">${rowIndex}</div>
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
