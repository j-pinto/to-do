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

  this.sortProjectsByName = function() {
    this.projArray.sort((a,b) => {
      if (a.title < b.title) {
        return -1
      }
      else {
        return 1
      }
    })
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