import { format, parse } from 'date-fns';
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

    let buttonDiv = document.createElement("div")
    buttonDiv.id = "mainButtonDiv"
    mainHeading.appendChild(buttonDiv)

    let taskButton = document.createElement("button")
    taskButton.id = "newTaskButton"
    taskButton.innerHTML = "New Task"
    buttonDiv.appendChild(taskButton)

    let editButton = document.createElement("button")
    editButton.id = "editProjectButton"
    editButton.innerHTML = "Edit Project"
    buttonDiv.appendChild(editButton)

    let deleteButton = document.createElement("button")
    deleteButton.id = "deleteProjectButton"
    deleteButton.innerHTML = "Delete Project"
    buttonDiv.appendChild(deleteButton)

    let taskList = document.createElement("div")
    taskList.id = "taskList"
    main.appendChild(taskList)
  }
  
  const printProjectList = (projectArray) => {
    clearList("projectList")
    printList(projectArray)
  }

  const printTaskList = (taskArray) => {
    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerHTML = `${taskArray[0].project}`
    
    clearList("taskList")
    printList(taskArray)
  }

  const printList = (arr) => {
    let isTask;
    let listIDString;
    if ('dueDate' in arr[0]) {
      isTask = true
      listIDString = "taskList"
    } else {
      isTask = false
      listIDString = "projectList"
    }

    let list = document.getElementById(listIDString)

    arr.forEach(item => {
      let listItem = document.createElement("div")
      listItem.className = `${listIDString}Item`
      list.appendChild(listItem)

      let listItemText = document.createElement("div")
      listItemText.className = `${listIDString}ItemText`
      listItemText.innerHTML = `${item.title}`
      listItem.appendChild(listItemText)

      if (isTask) {
        printTaskDetails(item, listItem, listItemText)
      }
    });
  }

  const printTaskDetails = (task, listItem, listItemText) => {
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.className = "checkbox"
    listItem.insertBefore(checkbox, listItemText)

    let date = parse(task.dueDate, 'yyyy/MM/dd', new Date()) 
    date = format(date, 'MMM do, yyyy')
    let dateDiv = document.createElement("div")
    dateDiv.className = "date"
    dateDiv.innerHTML = date 
    listItem.appendChild(dateDiv)

    let buttonDiv = document.createElement("div")
    buttonDiv.className = "taskButtonDiv"
    listItem.appendChild(buttonDiv)

    let editButton = document.createElement("button")
    editButton.className = "editTaskButton"
    editButton.innerHTML = "Edit"
    buttonDiv.appendChild(editButton)

    let deleteButton = document.createElement("button")
    deleteButton.className = "deleteTaskButton"
    deleteButton.innerHTML = "Delete"
    buttonDiv.appendChild(deleteButton)
  }

  const clearList = (listIDString) => {
    let list = document.getElementById(listIDString)
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
  }

  const makeSubheading = (textString) => {
    let taskList = document.getElementById("taskList")  
    let subHeading = document.createElement("div")
    subHeading.className = "subHeading"
    subHeading.innerHTML = textString
    taskList.appendChild(subHeading)
  }

  const printUpcomingTasks = (upcomingTasks) => {
    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerHTML = "Upcoming Tasks"

    clearList("taskList")

    if (upcomingTasks.past.length == 0 && upcomingTasks.day.length == 0 &&
        upcomingTasks.week.length == 0) 
    {
      taskList.innerHTML = "No upcoming tasks this week."
    }

    if (upcomingTasks.past.length > 0) {
      makeSubheading("Past Due:")
      printList(upcomingTasks.past)
    }

    if (upcomingTasks.day.length > 0) {
      makeSubheading("Today:")
      printList(upcomingTasks.day)
    }

    if (upcomingTasks.week.length > 0) {
      makeSubheading("Next 7 days:")
      printList(upcomingTasks.week)
    }
  }

  const pageInit = () => {
    createTopbar();
    createSidebar();
    createMainDiv();
    createModal();
  }
  
  const createModal = () => {
    let modalContainer = document.createElement("div")
    modalContainer.id = "modalContainer"
    modalContainer.style.display = "none"

    let modalContent = document.createElement("div")
    modalContent.id = "modalContent"

    let main = document.getElementById("main")
    main.appendChild(modalContainer)
    modalContainer.appendChild(modalContent)
    createModalButtons()
  }

  const createModalButtons = () => {
    let buttonDiv = document.createElement("div")
    buttonDiv.id = "modalButtonDiv"

    let modalContent = document.getElementById("modalContent")
    modalContent.appendChild(buttonDiv)

    let acceptButton = document.createElement("button")
    acceptButton.id = "acceptButton"
    acceptButton.innerHTML = "Enter"
    
    let cancelButton = document.createElement("button")
    cancelButton.id = "cancelButton"
    cancelButton.innerHTML = "Cancel"

    buttonDiv.appendChild(acceptButton)
    buttonDiv.appendChild(cancelButton)
  }

  return { 
    pageInit,
    printProjectList,  
    printTaskList,
    printUpcomingTasks
  }
  
})()

export { dom }

