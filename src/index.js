import "./style.css";
import { dom } from "./dom.js";
import { User } from "./user.js";

const user = new User();
user.attemptLoad();

dom.pageInit();
dom.printProjects(user.projArray)
dom.upcomingPage(user.taskArray)