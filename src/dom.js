const dom = (() => {
  const createTopbar = () => {
    let topbar = document.createElement("div");
    document.body.appendChild(topbar);
    topbar.id = "topbar";
    topbar.innerHTML = "ToDo";
  }

  const createSidebar = () => {
    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    document.body.appendChild(sidebar);

    let upcoming = document.createElement("div")
    upcoming.id = "upcoming"
    upcoming.innerHTML = "Upcoming Tasks"
    sidebar.appendChild(upcoming)

    let projButton = document.createElement("button")
    projButton.id = "newProjectButton"
    projButton.innerHTML = "New Project"
    sidebar.appendChild(projButton)

    let projList = document.createElement("div")
    projList.id = "projectsList"
    projList.innerHTML = "Projects: "
    sidebar.appendChild(projList)
  }

  const createMainDiv = () => {
    let main = document.createElement("div")
    document.body.appendChild(main)
    main.id = "main"

    let mainHeading = document.createElement("div")
    mainHeading.id = "mainHeading"
    main.appendChild(mainHeading)
    mainHeading.appendChild(document.createElement("br"))

    let taskButton = document.createElement("button")
    taskButton.id = "newTaskButton"
    taskButton.innerHTML = "New Task"
    mainHeading.appendChild(taskButton)

    let taskList = document.createElement("div")
    taskList.id = "taskList"
    main.appendChild(taskList)
  }
  
  const printProjectList = (projectArray) => {
    // remove all currently printed projects
    let projectList = document.getElementById("projectsList")
    while (projectList.firstChild) {
      projectList.removeChild(projectList.firstChild)
    }

    // re-print
    projectArray.forEach(project => {
      let projectListItem = document.createElement("div")
      projectListItem.className = "projectListItem"
      projectListItem.innerHTML = `${project.title}`
      projectList.appendChild(projectListItem)
    });
  }

  const printTaskList = (taskArray) => {
    // remove all currently printed tasks
    let taskList = document.getElementById("taskList")
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }

    // re-print
    taskArray.forEach(task => {
      let taskListItem = document.createElement("div")
      taskListItem.className = "taskListItem"
      taskListItem.innerHTML = `${task.title}`
      taskList.appendChild(taskListItem)
    });
  }
  
  const pageInit = () => {
    createTopbar();
    createSidebar();
    createMainDiv();
  }
  
  return { pageInit, printProjectList, printTaskList }
})()

export { dom }

