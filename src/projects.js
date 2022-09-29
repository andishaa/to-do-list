const PROJECTS = [];

const CreateNewProject = (name) => {
    const project = {};
    project.name = name.trim(); // remove if any extra empty spaces
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

const getProjectObj = (projectName) => {
    return PROJECTS.find(project => project.name === projectName);
}

function checkDuplicateName(projectName) {
    const isDuplicate = PROJECTS.find((project) => project.name === projectName) !== undefined;
    return isDuplicate; // true or false
}

console.log('current projects: ', PROJECTS);

export { PROJECTS, CreateNewProject, getProjectObj, checkDuplicateName };