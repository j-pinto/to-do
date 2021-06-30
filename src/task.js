function Task(name, proj, desc='', due='', pri='') {
  this.title = name
  this.description = desc
  this.dueDate = due
  this.priority = pri
  this.project = proj
}

export { Task }