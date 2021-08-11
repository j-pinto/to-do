import "./style.css";
import { dom } from "./dom.js";
import { User } from "./user.js";

localStorage.clear()
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
    editTaskListener()
    deleteTaskListener()
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
      //TODO
      return
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

  const editTaskListener = function() {
    let editButton = document.getElementById("editTaskButton")
    editButton.addEventListener("click", function() {
      //TODO
      return
    })
  }

  const deleteTaskListener = function() {
    let deleteButton = document.getElementById("deleteTaskButton")
    deleteButton.addEventListener("click", function() {
      //TODO
      return
    })
  }

  const submitNewProj = function() {
    let name = document.getElementById("projectNameInput").value
    user.createProject(name)
    dom.clearModal()
    dom.printProjectList(user.projArray)
    displayListeners()
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
  }

  const submitNewTask = function() {
    let name = document.getElementById("taskNameInput").value
    let projectName = document.getElementById("projectSelect").value
    let date = new Date( document.getElementById("dateInput").value )
    user.createTask(name, projectName, date)
    dom.clearModal()
    displayRefresh(projectName)
  }

  const getCurrentProject = function() {
    let headingTitle = document.getElementById("headingTitle")
    let currentProj = user.projArray.find( item => 
      item.title == headingTitle.innerHTML
    )
    
    if (currentProj == undefined) {
      currentProj = user.projArray[0]
    }

    return currentProj
  }

  const closeModalListener = function() {
    let cancelButton = document.getElementById("cancelButton")
    window.onclick = function(event) {
      if (event.target == modalContainer || event.target == cancelButton) {
        dom.clearModal()
      }
    }
  }

  return {
    init
  }

})();

input.init()