import { format } from 'date-fns'

function Task(name, proj, dateObject, pri='', desc='') {
  this.title = name
  this.description = desc
  this.dueDate = format(dateObject,'yyyy/MM/dd')
  this.priority = pri
  this.project = proj
}

export { Task }