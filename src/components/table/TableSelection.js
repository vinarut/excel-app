export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.className).focus()
    this.group.push($el)
    this.current = $el
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach(($el) => $el.addClass(TableSelection.className))
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
