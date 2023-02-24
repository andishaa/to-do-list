import { projectForm, renderProjectsList, renderSavedToDos } from "./DOM";
import { CreateNewProject, getProjectObj, checkDuplicateName, deleteAllToDos } from "./projects";
import { ToDoFactory } from "./todos";

let currentProject = 'Inbox';

function setUpToggleNavBtn() {
    const toggleNavBtn = document.querySelector('.toggle-nav-btn');
    const navBar = document.querySelector('.nav');
    toggleNavBtn.addEventListener('click', (e) => {
        navBar.classList.toggle('hidden');
    });
}

function setUpNavBtns() {
    const navListItems = document.querySelectorAll('.nav li');
    navListItems.forEach((navElement) => {
        navElement.addEventListener('click', (e) => {
            removeNavActiveClass();
            e.target.classList.add('nav-active');
            const projectName = e.target.textContent;
            currentProject = projectName;
            console.log('current project: ', currentProject);
            renderSavedToDos(projectName);
        });
    });
}

function removeNavActiveClass() {
    let elWithActiveClass = document.getElementsByClassName('nav-active');
    while (elWithActiveClass.length) {
        elWithActiveClass[0].classList.remove('nav-active');
    };
}

function setUpAddProjectBtn() {
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectsNav = document.querySelector('.projects-nav')

    addProjectBtn.addEventListener('click', () => {
        toggleAddProjectBtn(); // when the button is clicked hide it and show up the form
        projectsNav.append(projectForm()); //add the form below the Projects list
        setUpProjectFormBtns();
    });
}

function setUpProjectFormBtns() {
    const addBtn = document.getElementById('form-add-btn');
    const cancelBtn = document.getElementById('form-cancel-btn');
    const projectForm = document.querySelector('.project-form');
    const formInput = document.querySelector('.form-input');

    if (projectForm !== null) {
        //prevent the Enter key being pressed
        projectForm.addEventListener('submit', event => {
            event.preventDefault();
        });

        addBtn.addEventListener('click', () => {
            if (checkInputEmpty(formInput) === true) {
                return;
            }

            if (checkDuplicateName(formInput.value) === true) {
                formInput.value = '';
                alert('Project name already exists.')
                return;
            }

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

function checkInputEmpty(inputFieldQuery) {
    if (inputFieldQuery.value.trim() === '') {
        inputFieldQuery.setAttribute('style', 'border: 1px solid red');
        inputFieldQuery.value = '';
        inputFieldQuery.placeholder = "Field can't be empty";
        return true;
    }
}

const toggleAddProjectBtn = () => {
    const addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.classList.toggle('hidden');
}

const setUpAddNewToDoBtn = () => {
    const toDoFormBtn = document.getElementById('todo-form-btn');
    toDoFormBtn.addEventListener('click', () => {
        toggleToDoFormBtn();
        toggleToDoForm();
    });
}

const setUpAddToDoFormBtns = () => {
    const toDoForm = document.querySelector('.todo-form');
    const toDoAddBtn = document.getElementById('todo-add-btn');
    const toDoCancelBtn = document.getElementById('todo-cancel-btn');
    const toDoTitleInput = document.querySelector('.todo-title');
    const toDoDescriptionInput = document.querySelector('.todo-description');
    const toDoDueDateInput = document.querySelector('.todo-duedate');
    const toDoPriorityInput = document.getElementById('priority-input');

    // prevent the Enter key from being able to submit the form (otherwise it refreshes the hole page)
    toDoForm.addEventListener('submit', event => {
        event.preventDefault();
    });

    let dueDate = '';
    toDoDueDateInput.addEventListener('change', () => {
        dueDate = toDoDueDateInput.value;
    });

    toDoAddBtn.addEventListener('click', () => {
        // if the Title input of the form is empty, prevent the form from being submitted
        if (checkInputEmpty(toDoTitleInput) === true) {
            return;
        }

        // if no priority is selected by the user, add it to low priority by default
        if (toDoPriorityInput.value === 'none') {
            toDoPriorityInput.value = 'low';
        }

        let newToDo = ToDoFactory(toDoTitleInput.value, toDoDescriptionInput.value, dueDate, toDoPriorityInput.value);
        //always add by default all new todos to the Inbox
        if (currentProject !== 'Inbox') { //prevent duplicate adding a todo if we are already inside Inbox
            const inbox = getProjectObj('Inbox');
            inbox.addToDo(newToDo);
        }

        let project = getProjectObj(currentProject);
        project.addToDo(newToDo);
        toDoForm.reset(); // when the new To Do is added, clear all values from the form
        toggleToDoForm();
        toggleToDoFormBtn();
        renderSavedToDos(currentProject); // render the list of todos when a new one is added
    });

    toDoCancelBtn.addEventListener('click', () => {
        toDoForm.reset(); // clear if any values were entered in the form
        toggleToDoForm();
        toggleToDoFormBtn();
    });
}

const toggleToDoFormBtn = () => {
    const toDoFormBtn = document.getElementById('todo-form-btn');
    toDoFormBtn.classList.toggle('hidden');
}

const toggleToDoForm = () => {
    const toDoForm = document.querySelector('.todo-form');
    toDoForm.classList.toggle('hidden');
}

const setUpDeleteToDoBtns = () => {
    const deleteBtns = document.querySelectorAll('.card-btns .delete-btn');

    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const toDoId = e.target.parentElement.parentElement.parentElement.id; // our parent element <div class="todo-card"> is by default created with the corresponding ToDo ID
            deleteAllToDos(toDoId);
            renderSavedToDos(currentProject);
        });
    });
}

function setUpShowDetailsBtns() {
    const showDetailsBtns = document.querySelectorAll('.card-btns .show-more-btn');
    showDetailsBtns.forEach((btn) => {
        btn.addEventListener('click', e => {
            const toDoDetailsEl = e.target.parentElement.parentElement.parentElement.lastChild;
            const toDoDetailsElAttr = toDoDetailsEl.getAttribute('style');
            if (toDoDetailsElAttr === 'display: none') {
                toDoDetailsEl.style.display = null;
            } else {
                toDoDetailsEl.setAttribute('style', 'display: none');
            }

        });
    });
}

const initUI = () => {
    setUpToggleNavBtn();
    setUpAddProjectBtn();
    setUpNavBtns();
    setUpAddNewToDoBtn();
    setUpAddToDoFormBtns();
}

export { initUI, setUpDeleteToDoBtns, setUpShowDetailsBtns }