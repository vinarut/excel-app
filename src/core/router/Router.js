import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'
import {Loader} from '@/components/Loader'

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.loader = new Loader()
    this.changeHashHandler = this.changeHashHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changeHashHandler)
    this.changeHashHandler()
  }

  async changeHashHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)
    const Page = !ActiveRoute.path
      ? this.routes.dashboard
      : this.routes[ActiveRoute.page]

    if (Page) {
      this.page = new Page(ActiveRoute.param)
      const root = await this.page.getRoot()
      this.$placeholder.clear().append(root)
      this.page.afterRender()
    }
  }

  destroy() {
    window.removeEventListener('hashchange', this.changeHashHandler)
  }
}
