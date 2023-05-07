import { format, parse, startOfWeek } from "date-fns";
import * as STORAGE from "./storage";

const savedProjects = STORAGE.getProjects();

class Project {
    constructor(name) {
        this.name = capitalizeFirstLetter(name.trim());
        this.savedToDos = [];
    }

    editName(newName) {
        this.name = newName.trim();
    }

    addToDo(toDo) {
        this.savedToDos.push(toDo);
    }

    deleteToDo(toDoID) {
        const toDoToDelete = this.savedToDos.findIndex((toDo) => toDo.ID === toDoID);
        if (toDoToDelete !== -1) {
            this.savedToDos.splice(toDoToDelete, 1);
        }
    }

    clearSavedToDos() {
        this.savedToDos = [];
    }

    getSavedTodos() {
        return this.savedToDos;
    }

}

//create the needed projects that will store all To Do's by the given criteria e.g. Inbox, Today, This Week.
const Inbox = new Project('Inbox');
const Today = new Project('Today');
const ThisWeek = new Project('This Week');
STORAGE.addProject(Inbox);
STORAGE.addProject(Today);
STORAGE.addProject(ThisWeek);

function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
}

const getProjectObj = (projectName) => {
    return savedProjects.find(project => project.name === projectName);
}

function deleteAllToDos(toDoID) {
    savedProjects.forEach(project => {
        project.deleteToDo(toDoID);
    });
}

function deleteProject(projectName) {
    //in order to remove the saved toDos from the Inbox, we have to delete them by ID also when deleting the Project
    const projectObj = getProjectObj(projectName);

    projectObj.getSavedTodos().forEach(toDo => {
        deleteAllToDos(toDo.ID);
    });

    const projectToDelete = savedProjects.findIndex((project) => project.name === projectName);
    savedProjects.splice(projectToDelete, 1);
}

function getToDoObj(projectName, toDoID) { // tova shte mi trqbva kato iskam da promenqm veche zapazenite ToDo-ta
    const currentProject = getProjectObj(projectName);
    return currentProject.getSavedTodos().find(toDo => toDo.ID === toDoID);
}

function checkDuplicateName(projectName) {
    const isDuplicate = savedProjects.find((project) => project.name.toLowerCase() === projectName.toLowerCase()) !== undefined;
    return isDuplicate; // true or false
}

function filterToDosDueToday() {
    const InboxSavedTodos = Inbox.getSavedTodos();
    const todaysDate = format(new Date(), 'MM-dd-yyyy'); //need to format the date, otherwise can't compare the values

    // first we clear all savedToDos, if in previous session we had any saved
    Today.clearSavedToDos();

    //by default all our ToDOs are saved inside Inbox
    InboxSavedTodos.forEach(ToDo => {
        if (ToDo.dueDate === todaysDate) {
            Today.addToDo(ToDo);
        }
    });
}

function filterToDosDueThisWeek() {
    const InboxSavedTodos = Inbox.getSavedTodos();

    //clear all previously saved ToDos in ThisWeek
    ThisWeek.clearSavedToDos();

    InboxSavedTodos.forEach(ToDo => {
        const TODOdueDate = ToDo.dueDate;
        // logic to find if the ToDo dueDate is This Week
        // https://github.com/date-fns/date-fns/discussions/3205#discussioncomment-3815471
        if (startOfWeek(new Date()).getTime() === startOfWeek(parse(TODOdueDate, 'MM-dd-yyyy', new Date())).getTime()) {
            ThisWeek.addToDo(ToDo);
        }
    });
}

console.log('current projects: ', savedProjects);

export { Project, getProjectObj, getToDoObj, deleteProject, checkDuplicateName, deleteAllToDos, filterToDosDueToday, filterToDosDueThisWeek };