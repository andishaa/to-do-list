const PROJECTS = [];

function getProjects() {
    return PROJECTS;
}

function addProject(projectObject) {
    PROJECTS.push(projectObject);
}

// let PROJECTS = localStorage.getItem('savedProjects') ? 
// JSON.parse(localStorage.getItem('savedProjects')) : [];



export { getProjects, addProject };