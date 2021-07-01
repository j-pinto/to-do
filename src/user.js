import { Task } from "./task.js";
import { Project } from "./project.js";

function User(username) {
  this.name = username 
  this.taskArray = []
  this.projArray = []

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