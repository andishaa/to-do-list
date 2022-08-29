import './style.css';
import * as toDos from './todos.js';
import * as projects from './projects.js';
import { initUI } from './user-interface';
import { initDomLoad } from './DOM';

let dedoviyaProject = projects.CreateNewProject('Dedoviya');
let inbox = projects.CreateNewProject('Inbox');
let testToDo = toDos.ToDoFactory('test', 'dedoviyaaaaaaaa', '2022-20-03', 'low',);
let testToDo2 = toDos.ToDoFactory('test234', 'asdfgh', '203322-20-03', 'low',);
dedoviyaProject.addToDo(testToDo);
inbox.addToDo(testToDo2);
inbox.addToDo(testToDo2);
inbox.addToDo(testToDo2);

testToDo.editTitle('changedTitle asdfg');


function initialPageLoad(){
    initDomLoad();
    initUI();
};
initialPageLoad();