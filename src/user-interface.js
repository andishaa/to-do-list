import { projectForm, renderProjectsList, renderSavedToDos } from "./DOM";
import { CreateNewProject } from "./projects";

function setUpNavBtns() {
    const navListItems = document.querySelectorAll('.nav li');
    navListItems.forEach((navElement) => {
        navElement.addEventListener('click', (e) => {
            const projectName = e.target.textContent;
            renderSavedToDos(projectName);
        });
    });
}

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
            setUpNavBtns(); // after rendering the projects list and a new list items pops in the dom add an event listener again
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

const initUI = () => {
    setUpAddProjectBtn();
    setUpNavBtns();
}

export { initUI }