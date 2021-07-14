const dom = (() => {
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
  
  const createSidebar = () => {
    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    document.body.appendChild(sidebar);

    let upcoming = document.createElement("div")
    upcoming.id = "upcoming"
    upcoming.innerHTML = "Upcoming Tasks"
    sidebar.appendChild(upcoming)

    let projList = document.createElement("div")
    projList.id = "projectsList"
    projList.innerHTML = "Projects: "
    sidebar.appendChild(projList)

    let projButton = document.createElement("button")
    projButton.id = "newProjectButton"
    projButton.innerHTML = "New Project"
    sidebar.appendChild(projButton)
  }
  
  const createTopbar = () => {
    let topbar = document.createElement("div");
    document.body.appendChild(topbar);
    topbar.id = "topbar";
    topbar.innerHTML = "ToDo";
  }
  
  const printProjects = (projectArray) => {
    //remove all printed projects
    let projects = document.getElementById("projectsList")
    while (projects.firstChild) {
      projects.removeChild(projects.firstChild)
    }

    //re-print
    projects.innerHTML = "Projects:"
    newProjectButton()

    projectArray.forEach(project => {
      let projDiv = document.createElement("div")
      projDiv.className = "projectListItem"
      projDiv.innerHTML = `${project.title}`
  
      projects.appendChild(projDiv)
    });
  }
  
  const pageInit = () => {
    createTopbar();
    createSidebar();
    createMainDiv();
  }
  
  return { pageInit, printProjects }
})()

export { dom }

