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

  const printTaskList = (project) => {
    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerHTML = `${project.title}`

    let editButton = document.getElementById("editProjectButton")
    let deleteButton = document.getElementById("deleteProjectButton")
    editButton.style.display = "inline-block"
    deleteButton.style.display = "inline-block"
    
    let taskArray = project.tasks
    clearList("taskList")
    printList(taskArray)
  }

  const printList = (arr) => {
    if (arr.length == 0) {
      printEmptyList()
      return
    }

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
        listItem.setAttribute("data-project", `${item.project}`)
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

    let projNameDiv = document.createElement("div")
    projNameDiv.className = "projNameDiv"
    projNameDiv.innerHTML = `Project: ${task.project}`
    projNameDiv.style.display = "none"
    listItem.appendChild(projNameDiv)

    if (task.complete) {
      completedTaskStyling(listItem)
    }
  }

  const completedTaskStyling = (listItem) => {
    listItem.classList.add("completed")
    listItem.getElementsByClassName("checkbox")[0].checked = true
    listItem.getElementsByClassName("editTaskButton")[0].disabled = true
    listItem.getElementsByClassName("deleteTaskButton")[0].disabled = true
  }

  const standardTaskStyling = (listItem) => {
    listItem.classList.remove("completed")
    listItem.getElementsByClassName("checkbox")[0].checked = false
    listItem.getElementsByClassName("editTaskButton")[0].disabled = false
    listItem.getElementsByClassName("deleteTaskButton")[0].disabled = false
  }

  const flipTaskStyling = (taskObject, listItem) => {
    if (taskObject.complete) {
      completedTaskStyling(listItem)
    } else {
      standardTaskStyling(listItem)
    }
  }

  const printEmptyList = () => {
    let list = document.getElementById("taskList")
    let listItem = document.createElement("div")
    listItem.innerHTML = "This project contains no tasks"

    listItem.className = "taskListItem"
    listItem.style.border = "none"
    list.appendChild(listItem)
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

    let editButton = document.getElementById("editProjectButton")
    let deleteButton = document.getElementById("deleteProjectButton")
    editButton.style.display = "none"
    deleteButton.style.display = "none"

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

    let projNames = document.getElementsByClassName("projNameDiv")
    for (let i = 0; i < projNames.length; i++) {
       projNames[i].style.display = "block"
    }

    let editButtons = document.getElementsByClassName("editTaskButton")
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].style.display = "none"
    }

    let delButtons = document.getElementsByClassName("deleteTaskButton")
    for (let i = 0; i < delButtons.length; i++) {
      delButtons[i].style.display = "none"
    }
  }

  const pageInit = (userObject) => {
    createTopbar();
    createSidebar();
    createMainDiv();
    createModal();

    printProjectList(userObject.projArray)
    printUpcomingTasks(userObject.upcomingTasks)
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

    createModalProjectEntry()
    createModalTaskEntry()
    createModalDelete()
    createModalButtons()
  }

  const createModalProjectEntry = () => {
    let projectEntryDiv = document.createElement("div")
    projectEntryDiv.id = "projectEntryDiv"
    projectEntryDiv.style.display = "none"

    let textBox = document.createElement("input")
    textBox.setAttribute("type", "text")
    textBox.setAttribute("placeholder", "Enter Project Name")
    textBox.id = "projectNameInput"
    projectEntryDiv.appendChild(textBox)

    let modalContent = document.getElementById("modalContent")
    modalContent.appendChild(projectEntryDiv)
  }

  const createModalTaskEntry = () => {
    let taskEntryDiv = document.createElement("div")
    taskEntryDiv.id = "taskEntryDiv"
    taskEntryDiv.style.display = "none"

    let textBox = document.createElement("input")
    textBox.setAttribute("type", "text")
    textBox.setAttribute("placeholder", "Enter Task Name")
    textBox.id = "taskNameInput"
    taskEntryDiv.appendChild(textBox)
    taskEntryDiv.appendChild(document.createElement("br"))

    let dateLabel = document.createElement("label")
    dateLabel.setAttribute("for", "dateInput")
    dateLabel.innerHTML = "Due Date:"
    taskEntryDiv.appendChild(dateLabel)

    let dateEntry = document.createElement("input")
    dateEntry.setAttribute("type", "date")
    dateEntry.id = "dateInput"
    taskEntryDiv.appendChild(dateEntry)
    taskEntryDiv.appendChild(document.createElement("br"))

    let projectSelectLabel = document.createElement("label")
    projectSelectLabel.setAttribute("for", "projectSelect")
    projectSelectLabel.id = "projectSelectLabel"
    projectSelectLabel.innerHTML = "Assign to Project:"
    taskEntryDiv.appendChild(projectSelectLabel)

    let projectSelect = document.createElement("select")
    projectSelect.name = "projectSelect"
    projectSelect.id = "projectSelect"
    taskEntryDiv.appendChild(projectSelect)

    let modalContent = document.getElementById("modalContent")
    modalContent.appendChild(taskEntryDiv)
  }

  const createModalDelete = () => {
    let deleteDiv = document.createElement("div")
    deleteDiv.id = "deleteDiv"
    deleteDiv.style.display = "none"

    let modalContent = document.getElementById("modalContent")
    modalContent.appendChild(deleteDiv)
  }

  const createModalButtons = () => {
    let buttonDiv = document.createElement("div")
    buttonDiv.id = "modalButtonDiv"

    let modalContent = document.getElementById("modalContent")
    modalContent.appendChild(buttonDiv)

    let acceptButton = document.createElement("button")
    acceptButton.id = "acceptButton"
    acceptButton.innerHTML = "Submit"
    
    let cancelButton = document.createElement("button")
    cancelButton.id = "cancelButton"
    cancelButton.innerHTML = "Cancel"

    buttonDiv.appendChild(acceptButton)
    buttonDiv.appendChild(cancelButton)
  }

  const showProjectModal = (currentProj='') => {
    if (currentProj != '') {
      document.getElementById("projectNameInput").value = currentProj
    }
    let modalContainer = document.getElementById("modalContainer")
    modalContainer.style.display = "block"
    let projectEntryDiv = document.getElementById("projectEntryDiv")
    projectEntryDiv.style.display = "block"
  }

  const showProjDeleteModal = () => {
    let modalContainer = document.getElementById("modalContainer")
    modalContainer.style.display = "block"

    let deleteDiv = document.getElementById("deleteDiv")
    deleteDiv.style.display = "block"
    deleteDiv.innerHTML = "Are you sure you want to delete this project? All associated tasks will also be deleted."

    let acceptButton = document.getElementById("acceptButton")
    acceptButton.innerHTML = "Confirm"
  }

  const showTaskModal = (projectArray=[], taskObject=null) => {
    let modalContainer = document.getElementById("modalContainer")
    modalContainer.style.display = "block"
    let taskEntryDiv = document.getElementById("taskEntryDiv")
    taskEntryDiv.style.display = "block"

    let taskNameInput = document.getElementById("taskNameInput")
    let dateInput = document.getElementById("dateInput")
    let projectSelectLabel = document.getElementById("projectSelectLabel")
    let projectSelect = document.getElementById("projectSelect")

    if (taskObject != null) {
      let dueDate = format(new Date(taskObject.dueDate), 'yyyy-MM-dd')
      dateInput.value = dueDate
      taskNameInput.value = `${taskObject.title}`
      projectSelectLabel.style.display = "none"
      projectSelect.style.display = "none"
    } else if (projectArray != []) {
      projectArray.forEach(proj => {
      let option = document.createElement("option")
      option.value = proj.title
      option.innerHTML = `${proj.title}`
      projectSelect.appendChild(option)
      })
    }
  }

  const showTaskDeleteModal = () => {
    let modalContainer = document.getElementById("modalContainer")
    modalContainer.style.display = "block"

    let deleteDiv = document.getElementById("deleteDiv")
    deleteDiv.style.display = "block"
    deleteDiv.innerHTML = "Are you sure you want to delete this Task?"

    let acceptButton = document.getElementById("acceptButton")
    acceptButton.innerHTML = "Confirm"
  }
  
  const clearModal = () => {
    let modalContainer = document.getElementById("modalContainer")
    modalContainer.style.display = "none"
    let projectEntryDiv = document.getElementById("projectEntryDiv")
    projectEntryDiv.style.display = "none"
    let taskEntryDiv = document.getElementById("taskEntryDiv")
    taskEntryDiv.style.display = "none"
    let deleteDiv = document.getElementById("deleteDiv")
    deleteDiv.style.display = "none"
    let acceptButton = document.getElementById("acceptButton")
    acceptButton.innerHTML = "Submit"

    document.getElementById("dateInput").value = ""
    document.getElementById("projectNameInput").value = ""
    document.getElementById("taskNameInput").value = ""

    let projectSelect = document.getElementById("projectSelect")
    while (projectSelect.firstChild) {
      projectSelect.removeChild(projectSelect.firstChild)
    }
  }

  return { 
    pageInit,
    printProjectList,  
    printTaskList,
    printUpcomingTasks,
    showProjectModal,
    showTaskModal,
    showProjDeleteModal,
    showTaskDeleteModal,
    clearModal,
    flipTaskStyling
  }
  
})()

export { dom }