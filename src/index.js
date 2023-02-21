import './style.css';
import * as toDos from './todos.js';
import * as projects from './projects.js';
import { initUI } from './user-interface';
import { initDomLoad } from './DOM';

let dedoviyaProject = projects.CreateNewProject('Dedoviya');
let inbox = projects.getProjectObj('Inbox');
let testToDo = toDos.ToDoFactory('testLow', 'dedoviyaaaaaaaa', '2022-10-03', 'low',);
let testToDo2 = toDos.ToDoFactory('testMedium', 'asdfgh', '2022-08-23', 'medium',);
let testToDo3 = toDos.ToDoFactory('testHigh', 'test description', '2022-09-03', 'high')
dedoviyaProject.addToDo(testToDo);
inbox.addToDo(testToDo2);
inbox.addToDo(testToDo3);
testToDo.editTitle('changedTitlLow asdfg');


function initialPageLoad(){
    initDomLoad();
    initUI();
};
initialPageLoad();