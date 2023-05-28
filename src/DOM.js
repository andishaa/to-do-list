/**
 * Creates a new DOM element with optional attributes and text content.
 * @param {string} tagName - The tag name of the DOM element to create.
 * @param {object} attributes - An object containing attributes and their values to be set on the created element.
 * @param {string} text - The text content to set for the element.
 * @returns {HTMLElement} The created DOM element.
 */
function createDOMElement(tagName, attributes, text) {
    // Create a new DOM element using the specified tag name
    let element = document.createElement(tagName);

    // Set attributes on the element, if provided
    if (attributes) {
        for (let attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                element.setAttribute(attr, attributes[attr]);
            }
        }
    }

    // Set text content on the element, if provided
    if (text) {
        let textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }

    // Return the created DOM element
    return element;
}

const header = () => {
    const headerElement = createDOMElement('header', { class: 'header' })
    const h1 = createDOMElement('h1', {}, 'Organize your life')
    headerElement.appendChild(h1);

    //add a button for mobile screens to toggle the navigation bar
    const toggleNavBtn = createDOMElement('button', { class: 'toggle-nav-btn' }, '☰');
    headerElement.appendChild(toggleNavBtn);

    return headerElement;
}

const nav = () => {
    const nav = createDOMElement('nav', { class: 'nav' });

    const mainSection = createDOMElement('div', { class: 'main-nav' });

    const mainUl = createDOMElement('ul');
    const inboxLi = createDOMElement('li', { class: 'project-name nav-active' }, 'Inbox');
    mainUl.appendChild(inboxLi);

    const todayLi = createDOMElement('li', { class: 'project-name' }, 'Today');
    mainUl.appendChild(todayLi);

    const thisWeekLi = createDOMElement('li', { class: 'project-name' }, 'This Week');
    mainUl.appendChild(thisWeekLi);

    const projectsSection = createDOMElement('div', { class: 'projects-nav' });
    const projectsSectionTitle = createDOMElement('h1', {}, 'Projects');
    projectsSection.appendChild(projectsSectionTitle);

    const projectsDiv = createDOMElement('div', { class: 'projects-list' });
    projectsSection.appendChild(projectsDiv);

    const addProjectBtn = createDOMElement('button', { id: 'add-project-btn' }, 'Add Project');
    projectsSection.appendChild(addProjectBtn);

    mainSection.appendChild(mainUl);
    nav.appendChild(mainSection);
    nav.appendChild(projectsSection);

    return nav;
}

const projectForm = () => {
    const projectForm = createDOMElement('form', { class: 'project-form' });
    const input = createDOMElement('input', { class: 'form-input', type: 'text', placeholder: 'Project name' });
    projectForm.appendChild(input);

    const projectErrorSpan = createDOMElement('span', { id: 'projectError', class: 'error' })
    projectForm.appendChild(projectErrorSpan);

    const addBtn = createDOMElement('button', { type: 'button', id: 'form-add-btn', class: 'green-btn' }, 'Add');
    projectForm.appendChild(addBtn);

    const cancelBtn = createDOMElement('button', { type: 'button', id: 'form-cancel-btn', class: 'red-btn' }, 'Cancel');
    projectForm.appendChild(cancelBtn);

    return projectForm;
}

function createProjectListItemDiv(projectObj) {
    const projectsListDiv = document.querySelector('.projects-list');
    const projectListItemDiv = createDOMElement('div', { class: 'projects-list-item' });
    const nameContainerDiv = createDOMElement('div', { class: 'project-name' }, projectObj.getName());
    const deleteBtnContainerDiv = createDOMElement('div', { class: 'del-project-btn' }, 'X');

    projectListItemDiv.append(nameContainerDiv, deleteBtnContainerDiv);
    projectsListDiv.append(projectListItemDiv);
}

const main = () => {
    const mainEl = createDOMElement('main', { class: 'main' });
    const toDosDiv = createDOMElement('div', { class: 'todos-container' });
    const showToDoFormBtn = createDOMElement('button', { id: 'todo-form-btn' }, 'Add new To-Do');
    const addToDoForm = addNewToDoForm();

    mainEl.append(showToDoFormBtn, addToDoForm, toDosDiv);

    return mainEl;
}

const addNewToDoForm = () => {
    const toDoForm = createDOMElement('form', { class: 'todo-form hidden' });
    const titleInput = createDOMElement('input', { class: 'todo-title', type: 'text', required: '', placeholder: 'Title' });
    toDoForm.appendChild(titleInput);

    const titileErrorSpan = createDOMElement('span', { id: 'titleError', class: 'error' });
    toDoForm.appendChild(titileErrorSpan);

    const descriptionInput = createDOMElement('textarea', { class: 'todo-description', placeholder: 'Description (not required)' });
    toDoForm.appendChild(descriptionInput);

    const dueDateInput = createDOMElement('input', { type: 'date', class: 'todo-duedate', required: '' });
    dueDateInput.valueAsDate = new Date(); // by default set the date to Today's day
    toDoForm.appendChild(dueDateInput);

    const prioritySelect = toDoPrioritySelectElement();
    toDoForm.appendChild(prioritySelect);

    const buttonsSpan = createDOMElement('span', { class: 'add-cancel-todo-btns' });

    const addToDoBtn = createDOMElement('button', { type: 'button', id: 'todo-add-btn', class: 'green-btn' }, 'Add');
    buttonsSpan.appendChild(addToDoBtn);

    const cancelToDoBtn = createDOMElement('button', { type: 'button', id: 'todo-cancel-btn', class: 'red-btn' }, 'Cancel');
    buttonsSpan.appendChild(cancelToDoBtn);
    toDoForm.appendChild(buttonsSpan);

    return toDoForm;
}

function toDoPrioritySelectElement() {
    const prioritySelectElement = createDOMElement('select', { id: 'priority-input' });

    const optionDefault = createDOMElement('option', { value: 'none' }, '--Priority');
    prioritySelectElement.appendChild(optionDefault);

    const optionLow = createDOMElement('option', { value: 'low' }, 'Low Priority');
    prioritySelectElement.appendChild(optionLow);

    const optionMedium = createDOMElement('option', { value: 'medium' }, 'Medium Priority');
    prioritySelectElement.appendChild(optionMedium);

    const optionHigh = createDOMElement('option', { value: 'high' }, 'High Priority');
    prioritySelectElement.appendChild(optionHigh);

    return prioritySelectElement;
}

function createToDoCardDiv(toDoObj) {
    const toDosDivContainer = document.querySelector('.todos-container');
    const toDoCardDiv = createDOMElement('div', { id: toDoObj.getID(), class: `todo-card ${toDoObj.getPriority()}` });
    const toDoMain = createDOMElement('div', { class: 'todo-main' });
    const cardTitleDiv = createDOMElement('div', { class: 'card-title' }, toDoObj.getTitle());
    toDoMain.append(cardTitleDiv);
    const cardDueDateDiv = createDOMElement('div', { class: 'card-duedate' }, toDoObj.getDueDate());
    toDoMain.append(cardDueDateDiv);
    const cardBtns = createDOMElement('div', { class: 'card-btns' });
    const showMore = createDOMElement('button', { class: 'btn show-more-btn' }, '>>');
    cardBtns.append(showMore);
    const deleteBtn = createDOMElement('button', { class: 'btn delete-btn' }, 'Delete');
    cardBtns.append(deleteBtn);

    toDoMain.append(cardBtns);
    toDoCardDiv.append(toDoMain);

    const toDoDetails = createDOMElement('div', { class: 'todo-details', style: 'display: none' });

    const description = createDOMElement('div', { class: 'card-description' }, 'Description');
    const descriptionInfo = createDOMElement('span', { class: 'description-info' }, toDoObj.getDescription());
    if (toDoObj.getDescription() === '') {
        descriptionInfo.textContent = 'Empty description';
    }
    description.append(descriptionInfo);
    toDoDetails.append(description);

    const toDoPriority = createDOMElement('span', { class: 'todo-priority' }, `Priority: ${toDoObj.getPriority()}`);
    toDoDetails.append(toDoPriority);

    toDoCardDiv.append(toDoDetails);

    toDosDivContainer.append(toDoCardDiv);
}

export { header, nav, main, projectForm, toDoPrioritySelectElement, createToDoCardDiv, createProjectListItemDiv };