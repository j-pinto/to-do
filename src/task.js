import { format } from 'date-fns'

function Task(name, proj, dateObject, pri='', desc='') {
  this.title = name
  this.description = desc
  this.dueDate = format(dateObject,'eee MMM do, yyyy')
  this.priority = pri
  this.project = proj
}

export { Task }