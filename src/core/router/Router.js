import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changeHashHandler = this.changeHashHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changeHashHandler)
    this.changeHashHandler()
  }

  changeHashHandler() {
    if (this.page) {
      this.page.destroy()
    }
    const Page = !ActiveRoute.path
      ? this.routes.dashboard
      : this.routes[ActiveRoute.page]

    if (Page) {
      this.page = new Page(ActiveRoute.param)
      this.$placeholder.clear().append(this.page.getRoot())
      this.page.afterRender()
    }
  }

  destroy() {
    window.removeEventListener('hashchange', this.changeHashHandler)
  }
}
