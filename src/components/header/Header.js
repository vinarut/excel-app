import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from './header.template'
import {$} from '@/core/dom'
import {changeTitle} from '@/redux/actions'
import {isDelete, isExit} from '@/components/header/header.functions'
import {ActiveRoute} from '@core/router/ActiveRoute'
import {removeFromStorage} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(event) {
    this.$dispatch(changeTitle($(event.target).text()))
  }

  onClick(event) {
    if (isDelete(event) &&
        confirm('Вы действительно хотите удалить эту таблицу?')
    ) {
      removeFromStorage(ActiveRoute.param)
      ActiveRoute.changeRoute('#dashboard')
    } else if (isExit(event)) {
      ActiveRoute.changeRoute('#dashboard')
    }
  }
}
