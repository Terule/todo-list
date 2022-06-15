const listContainer = document.getElementById('list-container')
const listNameInput = document.getElementById('input-new-list')
const buttonAddList = document.getElementById('button-new-list')
class List {
  constructor(listContainer) {
    this.listContainer = listContainer
  }

  createList(listName) {
    const _newList = document.createElement('div')
    _newList.classList.add('list-card')
    this.createListHeader(listName, _newList)
    this.listContainer.appendChild(_newList)
  }

  createListHeader(listName, _newList) {
    const _listHeader = document.createElement('header')
    
    _listHeader.classList.add('list-title')
    this.createHeaderTitle(listName, _listHeader)
    this.createButtonDeleteList(_listHeader, _newList)
    _newList.appendChild(_listHeader)
  }

  createHeaderTitle(listName, _newList) {
    const _listNameText = document.createElement('h1')
    _listNameText.innerText = listName.toUpperCase()
    _listNameText.classList.add('list-name')
    _newList.appendChild(_listNameText)
    
  }

  createButtonDeleteList(parent, _newList) {
    const _listButtonDeleteContainer = document.createElement('div')
    const _listButtonDelete = document.createElement('i')

    _listButtonDeleteContainer.classList.add('icon')
    _listButtonDeleteContainer.classList.add('trash')

    _listButtonDelete.dataset.feather = 'trash-2'
    _listButtonDelete.setAttribute('width', 20)
    _listButtonDeleteContainer.addEventListener('click', () => {
      _newList.remove()
    })
    _listButtonDeleteContainer.appendChild(_listButtonDelete)
    parent.appendChild(_listButtonDeleteContainer)
  }
}
const list = new List(listContainer)

buttonAddList.addEventListener('click', () => {
  list.createList(listNameInput.value)
  listNameInput.value = '';
  feather.replace()
});
