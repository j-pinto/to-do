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

    let main = document.getElementById("main")
    main.appendChild(projButton)
  }
  
  const createSidebar = () => {
    let sidebar = document.createElement("div");
    document.body.appendChild(sidebar);
    sidebar.id = "sidebar";
    sidebar.innerHTML = "Sidebar";
  }
  
  const createTopbar = () => {
    let topbar = document.createElement("div");
    document.body.appendChild(topbar);
    topbar.id = "topbar";
    topbar.innerHTML = "ToDo";
  }
  
  const printProjects = (projectArray) => {
    let sidebar = document.getElementById("sidebar")
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
    newProjectButton();
  }
  
  return { pageInit, printProjects }
})()

export { dom }

