function Task(name, proj, due='', pri='', desc='') {
  this.title = name
  this.description = desc
  this.dueDate = due
  this.priority = pri
  this.project = proj
}

export { Task }