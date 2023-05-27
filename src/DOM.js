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

    const projectErrorSpan = document.createElement('span')
    projectErrorSpan.id = 'projectError';
    projectErrorSpan.classList.add('error');
    projectForm.appendChild(projectErrorSpan);

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

function createProjectListItemDiv(projectObj) {
    const projectsListDiv = document.querySelector('.projects-list');

    const projectListItemDiv = document.createElement('div');
    projectListItemDiv.classList.add('projects-list-item');

    const nameContainerDiv = document.createElement('div');
    nameContainerDiv.classList.add('project-name');
    nameContainerDiv.textContent = projectObj.getName();

    const deleteBtnContainerDiv = document.createElement('div');
    deleteBtnContainerDiv.classList.add('del-project-btn');
    deleteBtnContainerDiv.textContent = 'X';

    projectListItemDiv.append(nameContainerDiv, deleteBtnContainerDiv);
    projectsListDiv.append(projectListItemDiv);
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
    titleInput.required = true;
    toDoForm.appendChild(titleInput);

    const titileErrorSpan = document.createElement('span');
    titileErrorSpan.id = 'titleError';
    titileErrorSpan.classList.add('error');
    toDoForm.appendChild(titileErrorSpan);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('todo-description');
    descriptionInput.placeholder = 'Description (not required)';
    toDoForm.appendChild(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add('todo-duedate');
    dueDateInput.type = 'date';
    dueDateInput.valueAsDate = new Date(); // by default set the date to Today's day
    dueDateInput.required = true;
    toDoForm.appendChild(dueDateInput);

    const prioritySelect = toDoPrioritySelectElement();
    toDoForm.appendChild(prioritySelect);

    const buttonsSpan = document.createElement('span');
    buttonsSpan.classList.add('add-cancel-todo-btns');

    const addToDoBtn = document.createElement('button');
    addToDoBtn.textContent = 'Add';
    addToDoBtn.id = 'todo-add-btn';
    addToDoBtn.classList.add('green-btn');
    addToDoBtn.type = 'button';
    buttonsSpan.appendChild(addToDoBtn);

    const cancelToDoBtn = document.createElement('button');
    cancelToDoBtn.textContent = 'Cancel';
    cancelToDoBtn.id = 'todo-cancel-btn';
    cancelToDoBtn.classList.add('red-btn');
    cancelToDoBtn.type = 'button';
    buttonsSpan.appendChild(cancelToDoBtn);
    toDoForm.appendChild(buttonsSpan);

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

function createToDoCardDiv(toDoObj) {
    const toDosDivContainer = document.querySelector('.todos-container');

    const toDoCardDiv = document.createElement('div');
    toDoCardDiv.classList.add('todo-card', `${toDoObj.getPriority()}`); // add the priority status of the ToDo as a class to be able to change it's styles
    toDoCardDiv.id = toDoObj.getID();

    const toDoMain = document.createElement('div');
    toDoMain.classList.add('todo-main');

    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.classList.add('card-title');
    cardTitleDiv.textContent = toDoObj.getTitle();
    toDoMain.append(cardTitleDiv);

    const cardDueDateDiv = document.createElement('div');
    cardDueDateDiv.classList.add('card-duedate');
    cardDueDateDiv.textContent = toDoObj.getDueDate();
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
    descriptionInfo.textContent = toDoObj.getDescription();
    //if the toDo is with empty description, add by default this content:
    if (toDoObj.getDescription() === '') {
        descriptionInfo.textContent = 'Empty description';
    }
    description.append(descriptionInfo);
    toDoDetails.append(description);

    const toDoPriority = document.createElement('span');
    toDoPriority.classList.add('todo-priority');
    toDoPriority.textContent = `Priority: ${toDoObj.getPriority()}`;
    toDoDetails.append(toDoPriority);

    toDoCardDiv.append(toDoDetails);

    toDosDivContainer.append(toDoCardDiv);
}

export { header, nav, main, projectForm, toDoPrioritySelectElement, createToDoCardDiv, createProjectListItemDiv };