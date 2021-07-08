function createMainDiv() {
  let main = document.createElement("div");
  document.body.appendChild(main);
  main.id = "main";
  main.innerHTML = "Main Content";
}

function createSidebar() {
  let sidebar = document.createElement("div");
  document.body.appendChild(sidebar);
  sidebar.id = "sidebar";
  sidebar.innerHTML = "Sidebar";
}

function createTopbar() {
  let topbar = document.createElement("div");
  document.body.appendChild(topbar);
  topbar.id = "topbar";
  topbar.innerHTML = "ToDo";
}

function printProjects(projectArray) {
  let sidebar = document.getElementById("sidebar")
  projectArray.forEach(project => {
    let projDiv = document.createElement("div")
    projDiv.className = "projectDiv"
    projDiv.innerHTML = `${project.title}`

    sidebar.appendChild(projDiv)
  });
}

function pageInit() {
  createTopbar();
  createSidebar();
  createMainDiv();
}

export { pageInit, printProjects }
