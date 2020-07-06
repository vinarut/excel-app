import {defaultTitle} from '@/constants'

function toButton(button) {
  return `
    <div class="button">
      <i class="material-icons">${button.icon}</i>
    </div>
  `
}

export function createHeader(store) {
  const buttons = [
    {
      icon: 'delete'
    },
    {
      icon: 'exit_to_app'
    }
  ].map(toButton).join('')

  return `
    <input 
      type="text" 
      class="input" 
      value="${store.title || defaultTitle}" 
    />

    <div>
      ${buttons}
    </div>
  `
}
