import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@/core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, isCell} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {matrix, nextSelection} from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell.text())
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.$emit('table:select', $target.text())
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
    const {key, target, shiftKey} = event

    if (keys.includes(key) && !shiftKey) {
      event.preventDefault()
      const id = $(target).id(true)
      const $next = this.$root.find(nextSelection(key, id))
      if ($next.isNotEmpty()) {
        this.selectCell($next)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }
}
