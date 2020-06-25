import {range} from '@/core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return rows.reduce((acc, row) => {
    const ids = cols.map((col) => `${row}:${col}`)
    return [...acc, ...ids]
  }, []);
}

export function nextSelection(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowUp':
      row--
      break
    case 'ArrowLeft':
      col--
      break
  }

  return `[data-id="${row}:${col}"]`
}
