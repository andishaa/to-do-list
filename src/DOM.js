import { PROJECTS } from "./projects";
import { setUpDeleteToDoBtns } from "./user-interface";

const body = document.body;

const initDomLoad = () => {
    body.prepend(header());
    body.append(nav());
    body.append(main());
    renderProjectsList();
    renderSavedToDos('Inbox'); // always show Inbox on initial load
}

const header = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Organize your life';
    header.appendChild(h1);

    //add a button for mobile screens to toggle the navigation bar
    const toggleNavBtn = document.createElement('button');
    toggleNavBtn.classList.add('toggle-nav-btn');
    toggleNavBtn.textContent = "☰";
    header.appendChild(toggleNavBtn);

    return header;
}

const nav = () => {
    const nav = document.createElement('nav');
    nav.classList.add('nav');

    const mainSection = document.createElement('div');
    mainSection.classList.add('main-nav')

    const mainUl = document.createElement('ul');
    const inboxLi = document.createElement('li');
    inboxLi.textContent = 'Inbox';
    mainUl.append(inboxLi);

    const todayLi = document.createElement('li');
    todayLi.textContent = 'Today';
    mainUl.append(todayLi);

    const thisWeekLi = document.createElement('li');
    thisWeekLi.textContent = 'This Week';
    mainUl.append(thisWeekLi);

    const projectsSection = document.createElement('div');
    projectsSection.classList.add('projects-nav')
    const projectsSectionTitle = document.createElement('h1');
    projectsSectionTitle.textContent = 'Projects';
    projectsSection.append(projectsSectionTitle);

    const projectsUl = document.createElement('ul');
    projectsUl.classList.add('projects-list');
    projectsSection.append(projectsUl);

    const addProjectBtn = document.createElement('button');
    addProjectBtn.id = 'add-project-btn';
    addProjectBtn.textContent = 'Add project';
    projectsSection.append(addProjectBtn);

    mainSection.append(mainUl);
    nav.append(mainSection, projectsSection);

    return nav;
}

const projectForm = () => {
    const projectForm = document.createElement('form');
    projectForm.classList.add('project-form');

    const input = document.createElement('input');
    input.classList.add('form-input');
    input.type = 'text';
    input.placeholder = 'Project name';
    projectForm.appendChild(input);

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtn.id = 'form-add-btn';
    addBtn.classList.add('green-btn');
    addBtn.type = 'button';
    projectForm.appendChild(addBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'form-cancel-btn';
    cancelBtn.classList.add('red-btn');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.type = 'button';
    projectForm.appendChild(cancelBtn);

    return projectForm;
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

const main = () => {
    const mainEl = document.createElement('main');
    mainEl.classList.add('main');

    const toDosDiv = document.createElement('div');
    toDosDiv.classList.add('todos-container');
    const showToDoFormBtn = toDoFormBtn();
    const addToDoForm = addNewToDoForm();
    mainEl.append(showToDoFormBtn, addToDoForm, toDosDiv);

    return mainEl;
}

const toDoFormBtn = () => {
    const addToDoBtn = document.createElement('button');
    addToDoBtn.id = 'todo-form-btn';
    addToDoBtn.textContent = 'Add new To-Do';

    return addToDoBtn;
}

const addNewToDoForm = () => {
    const toDoForm = document.createElement('form');
    toDoForm.classList.add('todo-form', 'hidden'); //make it hidden by default

    const titleInput = document.createElement('input');
    titleInput.classList.add('todo-title');
    titleInput.placeholder = 'To Do Title';
    titleInput.type = 'text';
    titleInput.required;
    toDoForm.append(titleInput);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('todo-description');
    descriptionInput.placeholder = 'Description (not required)';
    toDoForm.append(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add('todo-duedate');
    dueDateInput.type = 'date';
    dueDateInput.required;
    toDoForm.append(dueDateInput);

    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority-input';
    const optionDefault = document.createElement('option');
    optionDefault.textContent = '--Priority';
    optionDefault.value = 'none';
    prioritySelect.append(optionDefault);

    const optionLow = document.createElement('option');
    optionLow.textContent = 'Low Priority';
    optionLow.value = 'low';
    prioritySelect.append(optionLow);

    const optionMedium = document.createElement('option');
    optionMedium.textContent = 'Medium Priority';
    optionMedium.value = 'medium';
    prioritySelect.append(optionMedium);

    const optionHigh = document.createElement('option');
    optionHigh.textContent = 'High Priority';
    optionHigh.value = 'high';
    prioritySelect.append(optionHigh);
    toDoForm.append(prioritySelect);

    const buttonsSpan = document.createElement('span');
    buttonsSpan.classList.add('add-cancel-todo-btns');

    const addToDoBtn = document.createElement('button');
    addToDoBtn.textContent = 'Add';
    addToDoBtn.id = 'todo-add-btn';
    addToDoBtn.classList.add('green-btn');
    addToDoBtn.type = 'button';
    buttonsSpan.append(addToDoBtn);

    const cancelToDoBtn = document.createElement('button');
    cancelToDoBtn.textContent = 'Cancel';
    cancelToDoBtn.id = 'todo-cancel-btn';
    cancelToDoBtn.classList.add('red-btn');
    cancelToDoBtn.type = 'button';
    buttonsSpan.append(cancelToDoBtn);
    toDoForm.append(buttonsSpan);

    return toDoForm;
}

const renderSavedToDos = (projectName) => {
    const projectsContainer = document.querySelector('.todos-container');

    removeChilds(projectsContainer); //remove all displayed project cards on each render

    PROJECTS.forEach((project) => {
        if (project.name !== projectName) {
            return; // don't render ToDos if it's not inside the correct project
        }

        project.savedToDos.forEach((toDo) => {
            const toDoCardDiv = document.createElement('div');
            toDoCardDiv.classList.add('todo-card');
            toDoCardDiv.id = toDo.ID;

            const cardTitleDiv = document.createElement('div');
            cardTitleDiv.classList.add('card-title');
            cardTitleDiv.textContent = toDo.title;
            toDoCardDiv.append(cardTitleDiv);

            const cardDueDateDiv = document.createElement('div');
            cardDueDateDiv.classList.add('card-duedate');
            cardDueDateDiv.textContent = toDo.dueDate;
            toDoCardDiv.append(cardDueDateDiv);

            const cardBtns = document.createElement('div');
            cardBtns.classList.add('card-btns');
            const showMore = document.createElement('button');
            showMore.classList.add('btn', 'show-more-btn');
            showMore.textContent = '>>';
            cardBtns.append(showMore);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'delete-btn');
            deleteBtn.textContent = 'Delete';
            cardBtns.append(deleteBtn);

            toDoCardDiv.append(cardBtns);

            projectsContainer.append(toDoCardDiv);
        });

        setUpDeleteToDoBtns();
    });

}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    };
}

export { initDomLoad, projectForm, renderProjectsList, removeChilds, renderSavedToDos };