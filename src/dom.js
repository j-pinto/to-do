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

    let projHeading = document.createElement("div")
    projHeading.id = "projectListHeading"
    projHeading.innerHTML = "Projects:"
    sidebar.appendChild(projHeading)

    let projButton = document.createElement("button")
    projButton.id = "newProjectButton"
    projButton.innerHTML = "New Project"
    sidebar.appendChild(projButton)

    let projList = document.createElement("div")
    projList.id = "projectsList"
    sidebar.appendChild(projList)
  }

  const createMainDiv = () => {
    let main = document.createElement("div")
    document.body.appendChild(main)
    main.id = "main"

    let mainHeading = document.createElement("div")
    mainHeading.id = "mainHeading"
    main.appendChild(mainHeading)

    let headingTitle = document.createElement("div")
    headingTitle.id = "headingTitle"
    mainHeading.appendChild(headingTitle)

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
      addHiddenTaskDetails(task)
    });
  }
  
  const addHiddenTaskDetails = (taskObject) => {
    let lastTaskListItem = document.getElementById("taskList").lastChild

    for (const property in taskObject) {
      if (taskObject[property] == taskObject.title) {
        continue
      }
      else {
        let taskDetail = document.createElement("div")
        taskDetail.className = "taskDetail"
        taskDetail.innerHTML = taskObject[property]
        lastTaskListItem.appendChild(taskDetail)
        taskDetail.style.display = "none"
      }
    }
  }

  const loadProject = (projectObject) => {
    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerHTML = `${projectObject.title}`
    printTaskList(projectObject.tasks)
  }

  const pageInit = () => {
    createTopbar();
    createSidebar();
    createMainDiv();
  }
  
  return { pageInit, printProjectList, loadProject, printTaskList }
})()

export { dom }

