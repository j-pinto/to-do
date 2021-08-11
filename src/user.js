import { Task } from "./task.js";
import { Project } from "./project.js";
import { storage } from "./storage.js";
import { differenceInCalendarDays, parse, compareAsc } from 'date-fns';

function User() {
  this.name = ''
  this.projArray = []
  this.taskArray = []
  this.upcomingTasks = {
    past: [],
    day: [],
    week: []
  }

  this.attemptLoad = function() {
    let parsedUser = storage.load()
    if (parsedUser == null) {
      this.name = 'user'
      this.createProject('General')
      return
    } else {
      this.name = parsedUser.name
      this.taskArray = parsedUser.tasks
      this.restoreProjects(parsedUser.projects)
    }
  }

  this.createProject = function(name) {
    let project = new Project(name);
    this.projArray.push(project)
    this.sortProjectsByName()

    storage.save(this)
  }

  this.deleteProject = function(projectObj) {
    let project = projectObj
  
    //erase tasks associated with project
    this.taskArray.forEach((task) => {
      if (task.project == project.title) {
        let index = this.taskArray.indexOf(task)
        this.taskArray.splice(index, 1)
      }
    })
  
    //remove project from project array
    let index = this.projArray.indexOf(project)
    this.projArray.splice(index, 1)
  
    storage.save(this)
  }

  this.editProject = function(oldName, newName) {
    //change project name
    let project = this.projArray.find(item => item.title == oldName)
    project.title = newName
    this.sortProjectsByName()
    console.log(`proj sort: ${this.projArray}`)

    //change associated tasks
    this.taskArray.forEach(task => {
      if (task.project == oldName) { task.project = newName }
    })
    project.linkTasks(this.taskArray)
    project.sortTasksByDate()
    console.log(`task sort: ${this.taskArray}`)
    this.generateUpcomingTasks()
    storage.save(this)
  }

  this.restoreProjects = function(parsedProjects) {
    parsedProjects.forEach(proj => {
      let restoredProj = new Project(proj.title)
      restoredProj.tasks = proj.tasks
      this.projArray.push(restoredProj)
    })
  }

  this.sortProjectsByName = function() {
    this.projArray.sort((a, b) => 
      a.title.localeCompare(b.title, 'en', 
      { sensitivity: 'base', numeric: true, ignorePunctuation: true }
      )
    )

    storage.save(this)
  }

  this.createTask = function(name, proj, dateObject, pri='', desc='') {
    let task = new Task(name, proj, dateObject, pri, desc);
    this.taskArray.push(task)

    let project = this.projArray.find(item => item.title == proj)
    project.linkTasks(this.taskArray)
    project.sortTasksByDate()
    this.generateUpcomingTasks()
    storage.save(this)
  }

  this.deleteTask = function(taskObj) {
    let task = taskObj
    let project = this.projArray.find(item => item.title == task.project)
    project.delinkTask(task)

    let index = this.taskArray.indexOf(task)
    this.taskArray.splice(index, 1)
  }

  this.generateUpcomingTasks = function() {
    this.upcomingTasks = { past: [], day: [], week: [] }

    this.taskArray.forEach(task => {
      let dueDate = parse(task.dueDate, 'yyyy/MM/dd', new Date())
      let diff = differenceInCalendarDays(dueDate, new Date())
      if (diff < 0 ) {
        this.upcomingTasks.past.push(task)
      } 
      else if (diff == 0){
        this.upcomingTasks.day.push(task)
      } 
      else if (diff > 0 && diff <= 7){
        this.upcomingTasks.week.push(task)
      }
    });

    this.sortUpcomingByDate()
  }

  this.sortUpcomingByDate = function() {
    for (const property in this.upcomingTasks) {
      this.upcomingTasks[property].sort((a,b) => {
        let date1 = parse(a.dueDate, 'yyyy/MM/dd', new Date())
        let date2 = parse(b.dueDate, 'yyyy/MM/dd', new Date())
        return compareAsc(date1, date2)
      })
    }
  }
}

export { User }