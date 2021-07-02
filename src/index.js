import "./style.css";
import { User } from "./user.js";

let topbar = document.createElement("div")
document.body.appendChild(topbar)
topbar.id = "topbar"
topbar.innerHTML = "ToDo"

let sidebar = document.createElement("div")
document.body.appendChild(sidebar)
sidebar.id = "sidebar"
sidebar.innerHTML = "Sidebar"

let main = document.createElement("div")
document.body.appendChild(main)
main.id = "main"
main.innerHTML = "Main Content"