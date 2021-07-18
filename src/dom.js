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
    projList.id = "projectList"
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
    clearList("projectList")

    projectArray.forEach(project => {
      let projectListItem = document.createElement("div")
      projectListItem.className = "projectListItem"
      projectListItem.innerHTML = `${project.title}`
      projectList.appendChild(projectListItem)
    });
  }

  const printTaskList = (taskArray) => {
    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerHTML = `${taskArray[0].project}`
    
    clearList("taskList")

    taskArray.forEach(task => {
      let taskListItem = document.createElement("div")
      taskListItem.className = "taskListItem"
      taskListItem.innerHTML = `${task.title}`
      taskList.appendChild(taskListItem)
      addHiddenTaskDetails(task)
    });
  }

  const clearList = (listIDString) => {
    let list = document.getElementById(listIDString)
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
  }

  const printUpcomingTasks = (upcomingTasks) => {
    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerHTML = "Upcoming Tasks"

    let taskList = document.getElementById("taskList")
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }

    if (upcomingTasks.past.length == 0 && upcomingTasks.day.length == 0 &&
        upcomingTasks.week.length == 0) 
    {
      taskList.innerHTML = "No upcoming tasks this week."
    }

    if (upcomingTasks.past.length > 0) {
      let subHeading = document.createElement("div")
      subHeading.className = "subHeading"
      subHeading.innerHTML = "Past due:"
      taskList.appendChild(subHeading)

      upcomingTasks.past.forEach(task => {
        let taskListItem = document.createElement("div")
        taskListItem.className = "taskListItem"
        taskListItem.innerHTML = `${task.title}`
        taskList.appendChild(taskListItem)
        addHiddenTaskDetails(task)
      });
    }

    if (upcomingTasks.day.length > 0) {
      let subHeading = document.createElement("div")
      subHeading.className = "subHeading"
      subHeading.innerHTML = "Today:"
      taskList.appendChild(subHeading)

      upcomingTasks.day.forEach(task => {
        let taskListItem = document.createElement("div")
        taskListItem.className = "taskListItem"
        taskListItem.innerHTML = `${task.title}`
        taskList.appendChild(taskListItem)
        addHiddenTaskDetails(task)
      });
    }

    if (upcomingTasks.week.length > 0) {
      let subHeading = document.createElement("div")
      subHeading.className = "subHeading"
      subHeading.innerHTML = "Next 7 days:"
      taskList.appendChild(subHeading)

      upcomingTasks.week.forEach(task => {
        let taskListItem = document.createElement("div")
        taskListItem.className = "taskListItem"
        taskListItem.innerHTML = `${task.title}`
        taskList.appendChild(taskListItem)
        addHiddenTaskDetails(task)
      });
    }
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
  
  return { 
    pageInit,
    loadProject, 
    printProjectList,  
    printTaskList,
    printUpcomingTasks 
  }
  
})()

export { dom }

