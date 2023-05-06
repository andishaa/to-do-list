import * as projectsModule from "./projects";
import { setUpToDosInteractivity } from "./user-interface";

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
    inboxLi.classList.add('nav-active', 'project-name');
    inboxLi.textContent = 'Inbox';
    mainUl.append(inboxLi);

    const todayLi = document.createElement('li');
    todayLi.classList.add('project-name');
    todayLi.textContent = 'Today';
    mainUl.append(todayLi);

    const thisWeekLi = document.createElement('li');
    thisWeekLi.classList.add('project-name');
    thisWeekLi.textContent = 'This Week';
    mainUl.append(thisWeekLi);

    const projectsSection = document.createElement('div');
    projectsSection.classList.add('projects-nav')
    const projectsSectionTitle = document.createElement('h1');
    projectsSectionTitle.textContent = 'Projects';
    projectsSection.append(projectsSectionTitle);

    const projectsDiv = document.createElement('div');
    projectsDiv.classList.add('projects-list');
    projectsSection.append(projectsDiv);

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
    const projectsListDivElement = document.querySelector('.projects-list');

    removeChilds(projectsListDivElement); //remove previously displayed <li> project names on each render (otherwise they start duplicating on every new project added)

    projectsModule.PROJECTS.forEach((project) => {
        //do not include the created by default Porjects: Inbox Today and This Week because they are already added in the nav() menu by default
        if (project.name === 'Inbox' || project.name === 'Today' || project.name === 'This Week') {
            return;
        }
        const projectListItem = document.createElement('div');
        projectListItem.classList.add('projects-list-item');

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('project-name');
        nameContainer.textContent = project.name;

        const deleteBtnContainer = document.createElement('div');
        deleteBtnContainer.classList.add('del-project-btn');
        deleteBtnContainer.textContent = 'X'; //maybe hide it and show it only while the project name is with class nav-active

        projectListItem.append(nameContainer, deleteBtnContainer);
        projectsListDivElement.append(projectListItem);
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
    dueDateInput.valueAsDate = new Date(); // by default set the date to Today's day
    dueDateInput.required;
    toDoForm.append(dueDateInput);

    const prioritySelect = toDoPrioritySelectElement();
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

function toDoPrioritySelectElement() {
    const prioritySelectElement = document.createElement('select');
    prioritySelectElement.id = 'priority-input';
    const optionDefault = document.createElement('option');
    optionDefault.textContent = '--Priority';
    optionDefault.value = 'none';
    prioritySelectElement.append(optionDefault);

    const optionLow = document.createElement('option');
    optionLow.textContent = 'Low Priority';
    optionLow.value = 'low';
    prioritySelectElement.append(optionLow);

    const optionMedium = document.createElement('option');
    optionMedium.textContent = 'Medium Priority';
    optionMedium.value = 'medium';
    prioritySelectElement.append(optionMedium);

    const optionHigh = document.createElement('option');
    optionHigh.textContent = 'High Priority';
    optionHigh.value = 'high';
    prioritySelectElement.append(optionHigh);
   
    return prioritySelectElement;
}

const renderSavedToDos = (projectName) => {
    const projectsContainer = document.querySelector('.todos-container');
    const Project = projectsModule.getProjectObj(projectName);
    const savedTodos = Project.getSavedTodos();

    removeChilds(projectsContainer); //remove all displayed project cards on each render

    savedTodos.forEach((toDo) => {
        const toDoCardDiv = document.createElement('div');
        toDoCardDiv.classList.add('todo-card', `${toDo.priority}`); // add the priority status of the ToDo as a class to be able to change it's styles
        toDoCardDiv.id = toDo.ID;

        const toDoMain = document.createElement('div');
        toDoMain.classList.add('todo-main');

        const cardTitleDiv = document.createElement('div');
        cardTitleDiv.classList.add('card-title');
        cardTitleDiv.textContent = toDo.title;
        cardTitleDiv.contentEditable = true; //make it possible to edit the titles when clicking on them
        toDoMain.append(cardTitleDiv);

        const cardDueDateDiv = document.createElement('div');
        cardDueDateDiv.classList.add('card-duedate');
        cardDueDateDiv.textContent = toDo.dueDate;
        toDoMain.append(cardDueDateDiv);

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

        toDoMain.append(cardBtns);
        toDoCardDiv.append(toDoMain);

        const toDoDetails = document.createElement('div');
        toDoDetails.classList.add('todo-details');
        toDoDetails.setAttribute('style', 'display: none'); // by default hide the details div of the todo on rendering

        const description = document.createElement('div');
        description.textContent = 'Description: ';
        description.classList.add('card-description');
        const descriptionInfo = document.createElement('span');
        descriptionInfo.classList.add('description-info');
        descriptionInfo.textContent = toDo.desctiption;
        //if the toDo is with empty description, add by default this content:
        if (toDo.desctiption === '') {
            descriptionInfo.textContent = 'Empty description';
        }
        description.append(descriptionInfo);
        toDoDetails.append(description);

        const toDoPriority = document.createElement('span');
        toDoPriority.classList.add('todo-priority');
        toDoPriority.textContent = `Priority: ${toDo.priority}`;
        toDoDetails.append(toDoPriority);

        toDoCardDiv.append(toDoDetails);

        projectsContainer.append(toDoCardDiv);
    });

    setUpToDosInteractivity();
}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    };
}

export { initDomLoad, projectForm, renderProjectsList, renderSavedToDos, toDoPrioritySelectElement };