import "./style.css";
import { dom } from "./dom.js";
import { User } from "./user.js";

const input = (function(){

  const refreshProjectListeners = function(){
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
  
    dom.printTaskList(selectedProject.tasks)
  }
  
  const displayUpcoming = function(){
    dom.printUpcomingTasks(user.upcomingTasks)
  }

  const projectControlListeners = function(){
    let newButton = document.getElementById("newProjectButton")
    newButton.addEventListener("click", function() {
      //TODO
      return
    })
    let editButton = document.getElementById("editProjectButton")
    editButton.addEventListener("click", function() {
      //TODO
      return
    })
    let deleteButton = document.getElementById("deleteProjectButton")
    deleteButton.addEventListener("click", function() {
      //TODO
      return
    })
  }

  const taskControlListeners = function(){
    let newButton = document.getElementById("newTaskButton")
    newButton.addEventListener("click", function() {
      //TODO
      return
    })
    let editButton = document.getElementById("editTaskButton")
    editButton.addEventListener("click", function() {
      //TODO
      return
    })
    let deleteButton = document.getElementById("deleteTaskButton")
    deleteButton.addEventListener("click", function() {
      //TODO
      return
    })
  }

  return {
    refreshProjectListeners
  }
})();

const user = new User();
user.attemptLoad();
user.generateUpcomingTasks()

dom.pageInit();
dom.printProjectList(user.projArray)

input.refreshProjectListeners()