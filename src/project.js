import { compareAsc, parse } from 'date-fns';

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
      let date1 = parse(a.dueDate, 'yyyy/MM/dd', new Date())
      let date2 = parse(b.dueDate, 'yyyy/MM/dd', new Date())
      return compareAsc(date1, date2)
    })
  }
}

export { Project }