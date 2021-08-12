import "./style.css";
import { dom } from "./dom.js";
import { User } from "./user.js";
import { format, add } from 'date-fns';

const user = new User();
user.attemptLoad();
user.generateUpcomingTasks()

dom.pageInit(user);

const input = (() => {

  const submitButton = document.getElementById("acceptButton")

  const init = function() {
    displayListeners()

    newProjectListener()
    editProjectListener()
    deleteProjectListener()

    newTaskListener()
    editTaskListeners()
    deleteTaskListeners()
  }

  const displayListeners = function() {
    let projects = document.getElementsByClassName("projectListItem")
    for (let i=0; i < projects.length; i++) {
      projects[i].addEventListener('click', displaySelectedPoject)
    }
  
    let upcoming = document.getElementById("upcoming")
    upcoming.addEventListener('click', displayUpcoming)
  }
  
  const displaySelectedPoject = function(event) {
    let selectedProject = user.projArray.find( item => 
      item.title == event.target.innerHTML
    )
  
    dom.printTaskList(selectedProject)
    editProjectListener()
    deleteProjectListener()
    newTaskListener()
    editTaskListeners()
    deleteTaskListeners()
  }

  const displayUpcoming = function() {
    dom.printUpcomingTasks(user.upcomingTasks)
  }

  const displayRefresh = function(projectName) {
    let selectedProject = user.projArray.find( item => item.title == projectName)
    dom.printTaskList(selectedProject)
  }

  const newProjectListener = function() {
    let newButton = document.getElementById("newProjectButton")
    newButton.addEventListener("click", function() {
      dom.showProjectModal()
      closeModalListener()
      submitButton.onclick = submitNewProj
    })
  }

  const editProjectListener = function() {
    let editButton = document.getElementById("editProjectButton")
    editButton.addEventListener("click", function() {
      let currentProj = getCurrentProject()
      dom.showProjectModal(currentProj.title)
      closeModalListener()
      submitButton.onclick = submitEditProj
    })
  }

  const deleteProjectListener = function() {
    let deleteButton = document.getElementById("deleteProjectButton")
    deleteButton.addEventListener("click", function() {
      dom.showProjDeleteModal()
      closeModalListener()
      submitButton.onclick = submitDeleteProj
    })
  }

  const newTaskListener = function() {
    let newButton = document.getElementById("newTaskButton")
    newButton.addEventListener("click", function() {
      dom.showTaskModal(user.projArray)
      closeModalListener()
      submitButton.onclick = submitNewTask
    })
  }

  const editTaskListeners = function() {
    let taskList = document.getElementsByClassName("taskListItem")
    for (let i = 0; i < taskList.length; i++) {
      let task = taskList[i]
      task.addEventListener("click", function(event) {
        if (event.target.className == 'editTaskButton') {
          let currentTask = getCurrentTask(this)
          const boundSubmitEditTask = submitEditTask.bind(null, currentTask)
          dom.showTaskModal([], currentTask)
          closeModalListener()
          submitButton.onclick = boundSubmitEditTask
        }
      })
    }
  }

  const deleteTaskListeners = function() {
    let taskList = document.getElementsByClassName("taskListItem")
    for (let i = 0; i < taskList.length; i++) {
      let task = taskList[i]
      task.addEventListener("click", function(event) {
        if (event.target.className == 'deleteTaskButton') {
          let currentTask = getCurrentTask(this)
          const boundSubmitDeleteTask = submitDeleteTask.bind(null, currentTask)
          dom.showTaskDeleteModal()
          closeModalListener()
          submitButton.onclick = boundSubmitDeleteTask
        }
      })
    }
  }

  const submitNewProj = function() {
    let name = document.getElementById("projectNameInput").value
    user.createProject(name)
    dom.clearModal()
    dom.printProjectList(user.projArray)
    displayListeners()
    displayRefresh(name)
  }

  const submitEditProj = function() {
    let currentProj = getCurrentProject()
    let oldName = currentProj.title
    let newName = document.getElementById("projectNameInput").value
    user.editProject(oldName, newName)
    dom.clearModal()
    dom.printProjectList(user.projArray)
    displayListeners()
    displayRefresh(newName)
    editTaskListeners()
    deleteTaskListeners()
  }

  const submitDeleteProj = function() {
    let currentProj = getCurrentProject()
    user.deleteProject(currentProj)
    dom.clearModal()
    dom.printProjectList(user.projArray)
    displayListeners()
    displayUpcoming()
    editTaskListeners()
    deleteTaskListeners()
  }

  const submitNewTask = function() {
    let name = document.getElementById("taskNameInput").value
    let projectName = document.getElementById("projectSelect").value
    let date = new Date( document.getElementById("dateInput").value )
    user.createTask(name, projectName, date)
    dom.clearModal()
    displayRefresh(projectName)
    editTaskListeners()
    deleteTaskListeners()
  }

  const submitEditTask = function() {
    let oldName = arguments[0].title
    let newName = document.getElementById("taskNameInput").value
    let projName = arguments[0].project
    let date = new Date( document.getElementById("dateInput").value )
    let formattedDate = formatDate(date)

    user.editTask(oldName, newName, formattedDate, projName)
    dom.clearModal()
    displayRefresh(projName)
    editTaskListeners()
    deleteTaskListeners()
  }

  const submitDeleteTask = function() {
    let currentTask = arguments[0]
    let projName = arguments[0].project
    user.deleteTask(currentTask)
    dom.clearModal()
    displayRefresh(projName)
    editTaskListeners()
    deleteTaskListeners()
  }

  const getCurrentProject = function() {
    let headingTitle = document.getElementById("headingTitle")
    let currentProj = user.projArray.find( item => 
      item.title == headingTitle.innerHTML
    )

    return currentProj
  }

  const getCurrentTask = function(el) {
    let taskName = el.getElementsByClassName("taskListItemText")[0].innerHTML
    let projName = el.getAttribute("data-project")

    let task = user.taskArray.find(item => 
      (item.title == taskName && item.project == projName)
    )
    return task
  }

  const closeModalListener = function() {
    let cancelButton = document.getElementById("cancelButton")
    window.onclick = function(event) {
      if (event.target == modalContainer || event.target == cancelButton) {
        dom.clearModal()
      }
    }
  }

  const formatDate = function(dateObject) {
    let compensatedDate = add(dateObject, {days: 1})
    let formattedDate = format(compensatedDate,'yyyy/MM/dd')
    return formattedDate
  }

  return {
    init
  }

})();

input.init()