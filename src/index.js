import "./style.css";
import { dom } from "./dom.js";
import { User } from "./user.js";

const user = new User();
user.attemptLoad();

dom.pageInit();
dom.printProjectList(user.projArray)