import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from './toolbar.template';
import {$} from '@/core/dom'
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribers: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
