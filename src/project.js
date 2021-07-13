function Project(name) {
  this.title = name
  this.tasks = []

  this.linkTasks = function(array) {
    this.tasks = []
    array.forEach(element => {
      if (element.project == this.title) {
        this.tasks.push(element)
      }  
    });
  }

  this.delinkTask = function(taskObj) {
    let index = this.tasks.indexOf(taskObj)
    if (index != -1) {
      this.tasks.splice(index, 1)
    }
  }

  this.sortTasksByDate = function() {
    this.tasks.sort((a,b) => {
      if (a.dueDate < b.dueDate || a.dueDate == b.dueDate) {
        return -1
      } else {
        return 1
      }
    })
  }
}

export { Project }