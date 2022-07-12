import { PROJECTS } from "./projects";

const body = document.body;

const initDomLoad = () => {
    body.prepend(header());
    body.append(nav());
    renderProjectsList();
}

const header = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Organize your life';

    header.appendChild(h1);

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

    const addProjectBtn = document.createElement('button');
    addProjectBtn.id = 'add-project-btn';
    addProjectBtn.textContent = 'Add project';
    projectsSection.append(addProjectBtn);

    const projectsUl = document.createElement('ul');
    projectsUl.classList.add('projects-list');
    projectsSection.append(projectsUl);

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
    addBtn.type = 'button';
    projectForm.appendChild(addBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'form-cancel-btn';
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

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    };
}

export { initDomLoad, projectForm, renderProjectsList, removeChilds };