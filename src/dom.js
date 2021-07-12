const dom = (() => {
  const createMainDiv = () => {
    let main = document.createElement("div");
    document.body.appendChild(main);
    main.id = "main";
    main.innerHTML = "Main Content";
  }

  const newTaskButton = () => {
    let taskButton = document.createElement("button")
    taskButton.id = "newtask"
    taskButton.innerHTML = "New Task"

    let main = document.getElementById("main")
    main.appendChild(taskButton)
  }

  const newProjectButton = () => {
    let projButton = document.createElement("button")
    projButton.id = "newproject"
    projButton.innerHTML = "New Project"

    let projects = document.getElementById("projects")
    projects.appendChild(projButton)
  }
  
  const createSidebar = () => {
    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    document.body.appendChild(sidebar);

    let upcoming = document.createElement("div")
    upcoming.id = "upcoming"
    upcoming.innerHTML = "Upcoming Tasks"
    sidebar.appendChild(upcoming)

    let projects = document.createElement("div")
    projects.id = "projects"
    projects.innerHTML = "Projects: "
    sidebar.appendChild(projects)
  }
  
  const createTopbar = () => {
    let topbar = document.createElement("div");
    document.body.appendChild(topbar);
    topbar.id = "topbar";
    topbar.innerHTML = "ToDo";
  }
  
  const printProjects = (projectArray) => {
    //remove all printed projects
    let projects = document.getElementById("projects")
    while (projects.firstChild) {
      projects.removeChild(projects.firstChild)
    }

    //re-print
    projects.innerHTML = "Projects:"
    newProjectButton()

    projectArray.forEach(project => {
      let projDiv = document.createElement("div")
      projDiv.className = "projectDiv"
      projDiv.innerHTML = `${project.title}`
  
      projects.appendChild(projDiv)
    });
  }
  
  const pageInit = () => {
    createTopbar();
    createSidebar();
    createMainDiv();
    newTaskButton();
  }
  
  return { pageInit, printProjects }
})()

export { dom }

