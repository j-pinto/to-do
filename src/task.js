import { format, add } from 'date-fns'

function Task(name, proj, dateObject) {
  this.title = name
  this.dueDate = formatDate(dateObject)
  this.project = proj

  function formatDate(dateObject) {
    let compensatedDate = add(dateObject, {days: 1})
    let formattedDate = format(compensatedDate,'yyyy/MM/dd')
    return formattedDate
  }
}

export { Task }