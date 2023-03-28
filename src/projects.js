import { format } from "date-fns";

const PROJECTS = [];

const CreateNewProject = (name) => {
    const project = {};
    project.name = capitalizeFirstLetter(name.trim()); // by default always make the first letter Capital and remove if any extra empty spaces were entered
    project.savedToDos = [];

    //if the user tryes to Add a new project without inputing anything in the form input field don't do anything
    if (project.name === '') {
        return;
    }

    PROJECTS.push(project);

    project.editName = (newName) => {
        project.name = newName;
    }

    project.deleteProject = (projectName) => {
        const projectToDelete = PROJECTS.findIndex((project) => project.name === projectName);
        PROJECTS.splice(projectToDelete, 1);
    }

    project.addToDo = (toDo) => {
        project.savedToDos.push(toDo);
    }

    project.deleteToDo = (toDoID) => {
        const toDoToDelete = project.savedToDos.findIndex((toDo) => toDo.ID === toDoID);
        if (toDoToDelete !== -1) {
            project.savedToDos.splice(toDoToDelete, 1);
        }
    }

    project.clearSavedToDos = () => { project.savedToDos = []; }

    return project;
}

//create the needed projects that will store all To Do's by the given criteria e.g. Inbox, Today, This Week.
CreateNewProject('Inbox');
CreateNewProject('Today');
CreateNewProject('This Week');

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

function getToDoObj(projectName, toDoID) { // tova shte mi trqbva kato iskam da promenqm veche zapazenite ToDo-ta
    const currentProject = getProjectObj(projectName);
    return currentProject.savedToDos.find(toDo => toDo.ID === toDoID);
}

function checkDuplicateName(projectName) {
    const isDuplicate = PROJECTS.find((project) => project.name.toLowerCase() === projectName.toLowerCase()) !== undefined;
    return isDuplicate; // true or false
}

function filterToDosDueToday() {
    const TodayProjectObj = getProjectObj('Today');
    const todaysDate = format(new Date(), 'MM-dd-yyyy'); //need to format the date, otherwise can't compare the values

    // first we clear all savedToDos, if in previous session we had any saved
    TodayProjectObj.clearSavedToDos();

    PROJECTS.forEach(Project => {
        // don't check in Today and This week
        if (Project.name === 'Today' || Project.name === 'This Week') {
            return;
        }

        Project.savedToDos.forEach(ToDo => {
            if (ToDo.dueDate === todaysDate) {
                TodayProjectObj.addToDo(ToDo);
            }
        });
    });
}

console.log('current projects: ', PROJECTS);

export { PROJECTS, CreateNewProject, getProjectObj, checkDuplicateName, deleteAllToDos, filterToDosDueToday };