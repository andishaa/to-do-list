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
        project.savedToDos.splice(toDoToDelete, 1);
    }

    return project;
}

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

function getToDoObj(projectName, toDoID) { // tova shte mi trqbva kato iskam da promenqm veche zapazenite ToDo-ta
    const currentProject = getProjectObj(projectName);
    return currentProject.savedToDos.find(toDo => toDo.ID === toDoID);
}

function checkDuplicateName(projectName) {
    const isDuplicate = PROJECTS.find((project) => project.name.toLowerCase() === projectName.toLowerCase()) !== undefined;
    return isDuplicate; // true or false
}

console.log('current projects: ', PROJECTS);

export { PROJECTS, CreateNewProject, getProjectObj, checkDuplicateName };