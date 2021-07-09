const storage = (() => {
  const save = (userObject) => {
    let nameString = JSON.stringify(userObject.name)
    let tasksString = JSON.stringify(userObject.taskArray)
    let projectsString = JSON.stringify(userObject.projArray)

    localStorage.setItem('name', nameString)
    localStorage.setItem('tasks', tasksString)
    localStorage.setItem('projects', projectsString)
  }

  return { save }
})()

export { storage }