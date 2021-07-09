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
  }

  this.createTask = function(name, proj, due='', pri='', desc='') {
    const task = new Task(name, proj, due, pri, desc);
    this.taskArray.push(task)

    let project = this.projArray.find(item => item.title == proj)
    project.getTasks(this.taskArray)
    project.sortTasksByDate()
  }
}

export { User }