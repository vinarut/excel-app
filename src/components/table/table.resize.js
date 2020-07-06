import {$} from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const isCol = $resizer.data.resize === 'col'
    const sideProp = isCol ? 'bottom' : 'right'
    let value

    $resizer.css({opacity: 1, [sideProp]: '-5000px'})

    document.onmousemove = e => {
      if (isCol) {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      if (isCol) {
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(cell => cell.style.width = value + 'px')
      }

      $parent.css({
        [isCol ? 'width' : 'height']: value + 'px'
      })

      resolve({
        value,
        isCol,
        id: isCol ? $parent.data.col : $parent.data.row
      })

      $resizer.css({opacity: 0, bottom: 0, right: 0})
      document.onmousemove = null
      document.onmouseup = null
    }
  })
}
