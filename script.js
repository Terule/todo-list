const listContainer = document.getElementById('list-container')
const listNameInput = document.getElementById('input-new-list')
const buttonAddList = document.getElementById('button-new-list')
const AddTaskButtonClose = document.getElementById('close-add-task-window')
const addTaskButton = document.getElementById('add-task-window-button')
const addTaskInput = document.getElementById('task-name')
const addTaskWindowBg = document.getElementById('add-task-window-bg')
const addTaskWindow = document.getElementById('add-task-window')
const swiperContainer = document.querySelector('.swiper')

const validadeInput  = () => listNameInput.value.trim().length >0

var swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  spaceBetween: 20,
  centeredSlides: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
});

class List {
  constructor(listContainer) {
    this.listContainer = listContainer
  }

  createList(listName) {
    const _newList = document.createElement('div')
    _newList.classList.add('list-card')
    _newList.classList.add('swiper-slide')
    this.populateList(_newList, listName)
    swiper.appendSlide(_newList)
    // this.listContainer.appendChild(_newList)
  }

  populateList(_newList, listName){
    this.createListHeader(listName, _newList)
    this.createTaskContainer(_newList)
    this.createTaskButtonMenu(_newList)
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
      swiper.removeSlide(_newList.remove())
    })
    _listButtonDeleteContainer.appendChild(_listButtonDelete)
    parent.appendChild(_listButtonDeleteContainer)
  }

  createTaskContainer(parent){
    const _taskContainer = document.createElement('div')
    _taskContainer.classList.add('list-items-container')
    parent.appendChild(_taskContainer)
  }

  createTaskButtonMenu(_newList){
    const _taskButtonPlusMenu = document.createElement('div')
    _taskButtonPlusMenu.classList.add('menu-plus')
    this.createAddTaskButton(_taskButtonPlusMenu, _newList)
    _newList.appendChild(_taskButtonPlusMenu)
  }

  createAddTaskButton(parent, _newList){
    const _taskButtonPlusContainer = document.createElement('div')
    const _taskButtonPlus = document.createElement('i')
    
    _taskButtonPlusContainer.classList.add('icon')
    _taskButtonPlusContainer.classList.add('plus')

    _taskButtonPlus.dataset.feather = 'plus'
    _taskButtonPlus.setAttribute('width', 24)
    _taskButtonPlusContainer.addEventListener('click',() => {
      addTaskWindow.classList.add('open')
      addTaskWindowBg.classList.add('open')
      this.taskContainer = _newList.childNodes[1]
    });

    _taskButtonPlusContainer.appendChild(_taskButtonPlus)
    parent.appendChild(_taskButtonPlusContainer)
  }
  createTask(taskName) {
    const taskContentContainer = document.createElement('div')
    taskContentContainer.classList.add('list-content')
    this.createTaskCheckboxContainer(taskContentContainer)
    this.createTaskText(taskName, taskContentContainer)
    this.taskContainer.appendChild(taskContentContainer)
  }

  createTaskCheckboxContainer(container) {
    const checkboxContainer =  document.createElement('div')
    const checkbox = document.createElement('input')
    const hr = document.createElement('hr')
    
    checkbox.type = 'checkbox'
    checkbox.classList.add('list-item-checkbox');
    checkbox.addEventListener('change', () => {
      container.childNodes[1].classList.toggle('completed')
    })
    
    checkboxContainer.classList.add('checkbox-container')

    checkboxContainer.appendChild(checkbox)
    checkboxContainer.appendChild(hr)

    container.appendChild(checkboxContainer)
  }

  createTaskText(text, container){
    const task = document.createElement('div')
    task.classList.add('list-item-text')
    task.innerText = text;
    container.appendChild(task)
  }
}

const list = new List(listContainer)

buttonAddList.addEventListener('click', () => {
  const inputIsValid = validadeInput()
  
  if(!inputIsValid) {
    return listNameInput.classList.add('error')
  }
  list.createList(listNameInput.value)
  swiperContainer.classList.remove('swiper')
  swiperContainer.classList.add('swiper')
  listNameInput.value = ''
  feather.replace()
});

listNameInput.addEventListener('input', () =>{
  const inputIsValid = validadeInput()
  
  if(inputIsValid) {
    return listNameInput.classList.remove('error')
  }
})

AddTaskButtonClose.addEventListener('click', () => {
  addTaskWindow.classList.remove('open')
  addTaskWindowBg.classList.remove('open')
})

addTaskButton.addEventListener('click',() =>{
  list.createTask(addTaskInput.value)
  addTaskWindow.classList.remove('open')
  addTaskWindowBg.classList.remove('open')
  addTaskInput.value = ''
})

