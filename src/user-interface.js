import { projectForm, removeChilds } from "./DOM";
import { CreateNewProject, PROJECTS } from "./projects";

function setUpAddProjectBtn() {
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectsTitle = document.querySelector('.projects-nav h1');
    addProjectBtn.addEventListener('click', () => {
        toggleAddProjectBtn(); // when the button is clicked hide it and show up the form
        projectsTitle.after(projectForm()); //add the form below the Projects h1 tag
        setUpFormBtns();
    });
}

function setUpFormBtns() {
    const addBtn = document.getElementById('form-add-btn');
    const cancelBtn = document.getElementById('form-cancel-btn');
    const projectForm = document.querySelector('.project-form');
    const formInput = document.querySelector('.form-input');
    if (projectForm !== null) {
        addBtn.addEventListener('click', () => {
            CreateNewProject(formInput.value);
            renderProjectsList();
            projectForm.remove();
            toggleAddProjectBtn();
        });
        cancelBtn.addEventListener('click', () => {
            projectForm.remove();
            toggleAddProjectBtn();
        });
    }
}

const toggleAddProjectBtn = () => {
    const addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.classList.toggle('hidden');
}

const renderProjectsList = () => {
    const projectsListULelement = document.querySelector('.projects-list');

    removeChilds(projectsListULelement); //remove previously displayed <li> project names on each render (otherwise they start duplicating on every new project added)

    PROJECTS.forEach((project) => {
        const listItem = document.createElement('li');
        listItem.classList.add('project-name');
        listItem.textContent = project.name;
        projectsListULelement.append(listItem);
    });
}

const initUI = () => {
    renderProjectsList();
    setUpAddProjectBtn();
}

export { initUI }