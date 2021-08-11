import "./style.css";
import { dom } from "./dom.js";
import { User } from "./user.js";

dom.pageInit();

const input = (function(){

  const projectDisplayListeners = function(){
    let projects = document.getElementsByClassName("projectListItem")
    for (let i=0; i < projects.length; i++) {
      projects[i].addEventListener('click', displaySelectedPoject)
    };
  
    let upcoming = document.getElementById("upcoming")
    upcoming.addEventListener('click', displayUpcoming)
  }
  
  const displaySelectedPoject = function(event){
    let selectedProject = user.projArray.find( item => 
      item.title == event.target.innerHTML
    )
  
    dom.printTaskList(selectedProject)
  }

  const refreshProjectDisplay = function(projectName) {
    let selectedProject = user.projArray.find( item => item.title == projectName)
    dom.printTaskList(selectedProject)
  }
  
  const displayUpcoming = function(){
    dom.printUpcomingTasks(user.upcomingTasks)
  }

  const projectControlListeners = function() {
    newProjectListener()
    editProjectListener()
    deleteProjectListener()
  }

  const taskControlListeners = function() {
    newTaskListener()
    editTaskListener()
    deleteTaskListener()
  }

  const newProjectListener = function() {
    let newButton = document.getElementById("newProjectButton")
    newButton.addEventListener("click", function() {
      dom.showProjectModal()
      closeModalListener()
      submitListener(submitNewProj)
    })
  }

  const editProjectListener = function() {
    let editButton = document.getElementById("editProjectButton")
    editButton.addEventListener("click", function() {
      let currentProj = getCurrentProject()
      dom.showProjectModal(currentProj.title)
      closeModalListener()
      submitEditProjListener()
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
      submitNewTaskListener()
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

  const submitListener = function(callback) {
    let submitButton = document.getElementById("acceptButton")
    submitButton.addEventListener("click", callback)
  }

  const submitNewProj = function() {
    let name = document.getElementById("projectNameInput").value
    user.createProject(name)
    dom.clearModal()
    dom.printProjectList(user.projArray)
    projectDisplayListeners()
  }

  const submitEditProjListener = function() {
    //TODO
  }

  const submitNewTaskListener = function() {
    let submitButton = document.getElementById("acceptButton")
    submitButton.addEventListener("click", function() {
      let name = document.getElementById("taskNameInput").value
      let projectName = document.getElementById("projectSelect").value
      let date = new Date( document.getElementById("dateInput").value )
      user.createTask(name, projectName, date)
      dom.clearModal()
      refreshProjectDisplay(projectName)
    })
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
    projectDisplayListeners,
    projectControlListeners,
    taskControlListeners
  }
})();

localStorage.clear()
const user = new User();
user.attemptLoad();
user.generateUpcomingTasks()

dom.printProjectList(user.projArray)

input.projectDisplayListeners()
input.projectControlListeners()
input.taskControlListeners()