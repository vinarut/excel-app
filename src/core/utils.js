export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }

  return new Array(end - start + 1).fill('').map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function storageName(params) {
  return 'excel:' + params
}

export function removeFromStorage(key) {
  localStorage.removeItem(storageName(key))
}

export function isEqual(a, b) {
  return typeof a === 'object' && typeof b === 'object'
      ? JSON.stringify(a) === JSON.stringify(b)
      : a === b
}

export function camelToKebab(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyle(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToKebab(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}
