function toButton(button) {
  const meta = `data-type="${button.type}"`
  return `
    <div class="button" ${meta}>
      <i class="material-icons" ${meta}>${button.icon}</i>
    </div>
  `
}

export function createHeader(store) {
  const buttons = [
    {
      icon: 'delete',
      type: 'del'
    },
    {
      icon: 'exit_to_app',
      type: 'exit'
    }
  ].map(toButton).join('')

  return `
    <input 
      type="text" 
      class="input" 
      value="${store.title}" 
    />

    <div>
      ${buttons}
    </div>
  `
}
