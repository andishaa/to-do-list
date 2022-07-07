import { projectForm } from "./DOM";

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
    if (projectForm !== null) {
        addBtn.addEventListener('click', () => {
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
}

export { initUI }