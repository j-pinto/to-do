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

    let sidebar = document.getElementById("sidebar")
    sidebar.appendChild(projButton)
  }
  
  const createSidebar = () => {
    let sidebar = document.createElement("div");
    document.body.appendChild(sidebar);
    sidebar.id = "sidebar";
  }
  
  const createTopbar = () => {
    let topbar = document.createElement("div");
    document.body.appendChild(topbar);
    topbar.id = "topbar";
    topbar.innerHTML = "ToDo";
  }
  
  const printProjects = (projectArray) => {
    //remove all printed projects
    let sidebar = document.getElementById("sidebar")
    while (sidebar.firstChild) {
      sidebar.removeChild(sidebar.firstChild)
    }

    //re-print
    sidebar.innerHTML = 'Projects:'
    newProjectButton()

    projectArray.forEach(project => {
      let projDiv = document.createElement("div")
      projDiv.className = "projectDiv"
      projDiv.innerHTML = `${project.title}`
  
      sidebar.appendChild(projDiv)
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

