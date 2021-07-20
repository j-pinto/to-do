import { format } from 'date-fns'

function Task(name, proj, dateObject) {
  this.title = name
  this.dueDate = format(dateObject,'yyyy/MM/dd')
  this.project = proj
}

export { Task }