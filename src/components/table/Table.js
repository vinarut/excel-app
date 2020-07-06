import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@/core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, isCell} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {matrix, nextSelection} from './table.functions'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@/core/parse'

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

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell.data.value)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      if (data.value) {
        this.$dispatch(actions.tableResize(data))
      }
    } catch (e) {
      console.warn(e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'
    ]
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      value,
      id: this.selection.current.id(),
    }))
  }

  onInput(event) {
    const $target = $(event.target)
    this.updateTextInStore($target.text())
    $target.attr('data-value', $target.text())
  }
}
