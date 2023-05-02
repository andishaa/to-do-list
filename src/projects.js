import { format, parse, startOfWeek } from "date-fns";

const PROJECTS = [];

const CreateNewProject = (name) => {
    //if the user tries to Add a new project without inputing anything in the form input field don't do anything
    if (name.trim() === '') {
        return;
    }

    const project = {};
    let savedToDos = [];

    project.name = capitalizeFirstLetter(name.trim()); // by default always make the first letter Capital and remove if any extra empty spaces were entered

    project.editName = (newName) => {
        project.name = newName;
    }

    project.addToDo = (toDo) => {
        savedToDos.push(toDo);
    }

    project.deleteToDo = (toDoID) => {
        const toDoToDelete = savedToDos.findIndex((toDo) => toDo.ID === toDoID);
        if (toDoToDelete !== -1) {
            savedToDos.splice(toDoToDelete, 1);
        }
    }

    project.clearSavedToDos = () => { savedToDos = []; }
    project.getSavedTodos = () => { return savedToDos };

    PROJECTS.push(project);

    return project;
}

//create the needed projects that will store all To Do's by the given criteria e.g. Inbox, Today, This Week.
const Inbox = CreateNewProject('Inbox');
const Today = CreateNewProject('Today');
const ThisWeek = CreateNewProject('This Week');

function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
}

const getProjectObj = (projectName) => {
    return PROJECTS.find(project => project.name === projectName);
}

function deleteAllToDos(toDoID) {
    PROJECTS.forEach(project => {
        project.deleteToDo(toDoID);
    });
}

function deleteProject(projectName) {
    //in order to remove the saved toDos from the Inbox, we have to delete them by ID also when deleting the Project
    const projectObj = getProjectObj(projectName);

    projectObj.getSavedTodos().forEach(toDo => {
        deleteAllToDos(toDo.ID);
    });

    const projectToDelete = PROJECTS.findIndex((project) => project.name === projectName);
    PROJECTS.splice(projectToDelete, 1);
}

function getToDoObj(projectName, toDoID) { // tova shte mi trqbva kato iskam da promenqm veche zapazenite ToDo-ta
    const currentProject = getProjectObj(projectName);
    return currentProject.getSavedTodos().find(toDo => toDo.ID === toDoID);
}

function checkDuplicateName(projectName) {
    const isDuplicate = PROJECTS.find((project) => project.name.toLowerCase() === projectName.toLowerCase()) !== undefined;
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

console.log('current projects: ', PROJECTS);

export { PROJECTS, CreateNewProject, getProjectObj, getToDoObj, deleteProject, checkDuplicateName, deleteAllToDos, filterToDosDueToday, filterToDosDueThisWeek };