import { Task } from "./task.js";
import { Project } from "./project.js";
import { storage } from "./storage.js";

function User() {
  this.name = 'user' 
  this.taskArray = []
  this.projArray = []

  this.attemptLoad = function() {
    let parsedUser = storage.load()
    if (parsedUser == null) {
      return
    } else {
      this.name = parsedUser.name
      this.taskArray = parsedUser.tasks
      this.projArray = parsedUser.projects
    }
  }

  this.createProject = function(name) {
    const project = new Project(name);
    this.projArray.push(project)
    this.sortProjectsByName()

    storage.save(this)
  }

  this.deleteProject = function(name) {
    let project = this.projArray.find(item => item.title == name)
  
    //erase tasks associated with project
    this.taskArray.forEach((task) => {
      if (task.project == project.title) {
        let index = this.taskArray.indexOf(task)
        this.taskArray.splice(index, 1)
      }
    })
  
    //remove project from project array
    let index = this.projArray.indexOf(project)
    this.projArray.splice(index, 1)
  
    storage.save(this)
  }

  this.sortProjectsByName = function() {
    this.projArray.sort((a, b) => 
      a.title.localeCompare(b.title, 'en', 
      { sensitivity: 'base', numeric: true, ignorePunctuation: true }
      )
    )

    storage.save(this)
  }

  this.createTask = function(name, proj, due='', pri='', desc='') {
    const task = new Task(name, proj, due, pri, desc);
    this.taskArray.push(task)

    let project = this.projArray.find(item => item.title == proj)
    project.getTasks(this.taskArray)
    project.sortTasksByDate()

    storage.save(this)
  }
}

export { User }