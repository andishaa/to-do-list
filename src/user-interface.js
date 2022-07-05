const body = document.body;

const initialPageLoad = () => {
    body.prepend(header());
    body.append(nav());
    setUpAddProjectBtn();
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

    projectsSection.append(projectForm());

    const addProjectBtn = document.createElement('button');
    addProjectBtn.id= 'add-project-btn';
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
    projectForm.classList.add('project-form', 'hidden'); // make it hidden and show it only when Add project btn is clicked

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Project name';
    projectForm.appendChild(input);

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtn.id = 'form-add-btn';
    projectForm.appendChild(addBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancel'
    cancelBtn.textContent = 'Cancel';
    projectForm.appendChild(cancelBtn);

    return projectForm;
}

function setUpAddProjectBtn() {
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectForm = document.querySelector('.project-form');
    addProjectBtn.addEventListener('click', () => {
        addProjectBtn.classList.add('hidden'); // when the button is clicked hide it and show up the form
        projectForm.classList.remove('hidden');
    });
}

function setUpFormAddBtn() { 
    const addBtn = document.getElementById('form-add-button')
}

export { initialPageLoad }