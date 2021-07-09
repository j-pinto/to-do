const storage = (() => {
  const save = (userObject) => {
    let nameString = JSON.stringify(userObject.name)
    let tasksString = JSON.stringify(userObject.taskArray)
    let projectsString = JSON.stringify(userObject.projArray)

    localStorage.setItem('name', nameString)
    localStorage.setItem('tasks', tasksString)
    localStorage.setItem('projects', projectsString)
  }

  const load = () => {
    if ( userExists() ) {
      let retrievedName = localStorage.getItem('name')
      let retrievedTasks = localStorage.getItem("tasks")
      let retrievedProjects = localStorage.getItem("projects")
      
      let parsedName = JSON.parse(retrievedName)
      let parsedTasks = JSON.parse(retrievedTasks)
      let parsedProjects = JSON.parse(retrievedProjects)

      return { 
        name: parsedName, 
        tasks: parsedTasks, 
        projects: parsedProjects 
      }
    } else {
      return null
    }
  }

  const userExists = () => {
    if ('name' in localStorage) {
      return true
    } else {
      return false
    }
  }

  return { save, load }
})()

export { storage }