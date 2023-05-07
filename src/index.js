import './style.css';
import { ToDo } from './todos.js';
import * as projects from './projects.js';
import { initUI } from './user-interface';
import { initDomLoad } from './DOM';
import * as STORAGE from "./storage";

function addDemoContent() {
    let dedoviyaProject = new projects.Project('Dedoviya');
    STORAGE.addProject(dedoviyaProject);
    let inbox = projects.getProjectObj('Inbox');
    let testToDo = new ToDo('testLow', 'dedoviyaaaaaaaa', '2022-10-03', 'low');
    let testToDo2 = new ToDo('testMedium', 'asdfgh', '2022-08-23', 'medium');
    let testToDo3 = new ToDo('testHigh', 'test description', '2022-09-03', 'high');
    dedoviyaProject.addToDo(testToDo);
    inbox.addToDo(testToDo2);
    inbox.addToDo(testToDo3);
    testToDo.editTitle('changedTitlLow asdfg');
}

function initialPageLoad() {
    addDemoContent();
    initDomLoad();
    initUI();
};
initialPageLoad();