import { format } from "date-fns";
import * as DOM from "./DOM";
import Project from "./projects";
import ToDo from "./todos";
import Storage from "./storage";

let currentProject = "Inbox";

function initDomLoad() {
  const { body } = document;
  body.prepend(DOM.header());
  body.append(DOM.nav());
  body.append(DOM.main());
  renderProjectListDivs();
  renderProjectToDoDivs(currentProject);
}

function initUI() {
  setUpToggleNavBtn();
  setUpNav();
  setUpAddNewToDoBtn();
  setUpAddToDoFormBtns();
}

function renderProjectListDivs() {
  const projectsListDiv = document.querySelector(".projects-list");

  projectsListDiv.innerHTML = ""; // clear if previously rendered projects

  Storage.savedProjects()
    .getProjects()
    .forEach((project) => {
      // do not include the created by default Porjects: Inbox Today and This Week because they are already added in the nav() menu by default
      if (
        project.getName() === "Inbox" ||
        project.getName() === "Today" ||
        project.getName() === "This Week"
      ) {
        return;
      }
      DOM.createProjectListItemDiv(project);
    });
}

function renderProjectToDoDivs(projectName) {
  const toDosDivContainer = document.querySelector(".todos-container");
  const projectObject = Storage.getProjectObj(projectName);
  const savedTodos = projectObject.getSavedTodos();

  toDosDivContainer.innerHTML = ""; // clear if previously rendered todos

  savedTodos.forEach((toDo) => {
    DOM.createToDoCardDiv(toDo);
  });

  setUpToDosInteractivity();
}

function setUpToggleNavBtn() {
  const toggleNavBtn = document.querySelector(".toggle-nav-btn");
  const navBar = document.querySelector(".nav");
  toggleNavBtn.addEventListener("click", (e) => {
    navBar.classList.toggle("hidden");
  });
}

function setUpNav() {
  const navElement = document.querySelector(".nav");
  const addToDoBtn = document.getElementById("todo-form-btn");

  navElement.addEventListener("click", (event) => {
    const { target } = event;

    // setup navigating through projects
    if (target.classList.contains("project-name")) {
      removeNavActiveClass();
      target.classList.add("nav-active");
      currentProject = target.textContent;

      switch (currentProject) {
        case "Today":
          Storage.updateTodayProject();
          addToDoBtn.disabled = true;
          break;
        case "This Week":
          Storage.updateThisWeekProject();
          addToDoBtn.disabled = true;
          break;
        default:
          addToDoBtn.disabled = false;
          break;
      }

      renderProjectToDoDivs(currentProject);
    }

    // setup project delete
    if (target.classList.contains("del-project-btn")) {
      const projectNameToDelete = target.previousSibling.textContent;
      Storage.deleteProject(projectNameToDelete);
      target.parentElement.remove();
      currentProject = "Inbox";
      renderProjectToDoDivs(currentProject);
    }

    // setup Add project button
    if (target.id === "add-project-btn") {
      const projectsNav = document.querySelector(".projects-nav");

      toggleAddProjectBtn(); // when the button is clicked hide it and show up the form
      projectsNav.append(DOM.projectForm()); // add the form below the Projects list
      setUpProjectFormBtns();
    }
  });
}

function removeNavActiveClass() {
  const elWithActiveClass = document.getElementsByClassName("nav-active");
  while (elWithActiveClass.length) {
    elWithActiveClass[0].classList.remove("nav-active");
  }
}

function setUpProjectFormBtns() {
  const addBtn = document.getElementById("form-add-btn");
  const cancelBtn = document.getElementById("form-cancel-btn");
  const projectForm = document.querySelector(".project-form");

  if (projectForm !== null) {
    projectForm.addEventListener("submit", (event) => {
      submitNewProject();
    });

    addBtn.addEventListener("click", () => {
      submitNewProject();
    });

    cancelBtn.addEventListener("click", () => {
      projectForm.remove();
      toggleAddProjectBtn();
    });
  }
}

function submitNewProject() {
  const projectForm = document.querySelector(".project-form");
  const formInput = document.querySelector(".form-input");
  const projectErrorSpan = document.querySelector("#projectError");

  if (!formInput.value) {
    projectErrorSpan.textContent = "Project Name can't be empty";
    return;
  }

  if (Storage.checkDuplicateName(formInput.value) === true) {
    formInput.value = "";
    projectErrorSpan.textContent = "Project name already exists.";
    return;
  }

  const newProject = new Project(formInput.value);
  Storage.addProject(newProject);
  renderProjectListDivs();
  projectForm.remove();
  toggleAddProjectBtn();
}

function checkInputEmpty(inputFieldQuery) {
  if (inputFieldQuery.value.trim() === "") {
    inputFieldQuery.setAttribute("style", "border: 1px solid red");
    inputFieldQuery.value = "";
    inputFieldQuery.placeholder = "Field can't be empty";
    return true;
  }
}

const toggleAddProjectBtn = () => {
  const addProjectBtn = document.getElementById("add-project-btn");
  addProjectBtn.classList.toggle("hidden");
};

const setUpAddNewToDoBtn = () => {
  const toDoFormBtn = document.getElementById("todo-form-btn");
  toDoFormBtn.addEventListener("click", () => {
    toggleToDoFormBtn();
    toggleToDoForm();
  });
};

const setUpAddToDoFormBtns = () => {
  const toDoForm = document.querySelector(".todo-form");
  const toDoAddBtn = document.getElementById("todo-add-btn");
  const toDoCancelBtn = document.getElementById("todo-cancel-btn");
  const toDoTitleInput = document.querySelector(".todo-title");
  const toDoDescriptionInput = document.querySelector(".todo-description");
  const toDoDueDateInput = document.querySelector(".todo-duedate");
  const toDoPriorityInput = document.getElementById("priority-input");
  const toDoTitleErrorSpan = document.querySelector("#titleError");

  // prevent the Enter key from being able to submit the form (otherwise it refreshes the hole page)
  toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  let dueDate = toDoDueDateInput.value;
  toDoDueDateInput.addEventListener("change", () => {
    dueDate = toDoDueDateInput.value;
  });

  toDoAddBtn.addEventListener("click", () => {
    // if the Title input of the form is empty, prevent the form from being submitted
    if (!toDoTitleInput.value) {
      toDoTitleErrorSpan.textContent = "Title can not be empty";
      return;
    }
    toDoTitleErrorSpan.textContent = "";

    // if no priority is selected by the user, add it to low priority by default
    if (toDoPriorityInput.value === "none") {
      toDoPriorityInput.value = "low";
    }

    const newToDo = new ToDo(
      toDoTitleInput.value,
      toDoDescriptionInput.value,
      format(new Date(dueDate), "MM-dd-yyyy"),
      toDoPriorityInput.value
    );

    Storage.addToDo(currentProject, newToDo);

    toDoForm.reset();
    // because we reset the form, we have to set the default form input date and dueDate to Today again
    toDoDueDateInput.valueAsDate = new Date();
    dueDate = new Date();
    toggleToDoForm();
    toggleToDoFormBtn();
    renderProjectToDoDivs(currentProject); // render the list of todos when a new one is added
  });

  toDoCancelBtn.addEventListener("click", () => {
    toDoForm.reset(); // clear if any values were entered in the form
    toggleToDoForm();
    toggleToDoFormBtn();
  });
};

const toggleToDoFormBtn = () => {
  const toDoFormBtn = document.getElementById("todo-form-btn");
  toDoFormBtn.classList.toggle("hidden");
};

const toggleToDoForm = () => {
  const toDoForm = document.querySelector(".todo-form");
  toDoForm.classList.toggle("hidden");
};

function setUpEditToDoTitle() {
  const toDoTitles = document.querySelectorAll(".card-title");

  toDoTitles.forEach((titleElement) => {
    titleElement.contentEditable = true;
    titleElement.addEventListener("input", (e) => {
      let newTitle = e.target.textContent.trim();
      // if the user edits the title and forgets to enter a title, alert and prompt for new title:
      if (newTitle === "") {
        alert("Title can't be empty");
        newTitle = prompt("Enter ToDo Title:");
        e.target.textContent = newTitle;
      }
      const toDoID = e.target.parentElement.parentElement.id;
      Storage.changeToDoTitle(currentProject, toDoID, newTitle);
    });
  });
}

function setUpEditDueDate() {
  const cardDueDateDivs = document.querySelectorAll(".card-duedate");

  cardDueDateDivs.forEach((dueDateDiv) => {
    dueDateDiv.addEventListener(
      "click",
      (e) => {
        const clickedElement = e.target;
        const toDoID = clickedElement.parentElement.parentElement.id;
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        // clear the text inside the div
        clickedElement.textContent = "";
        clickedElement.append(dateInput);
        dateInput.addEventListener("change", () => {
          Storage.changeDueDate(
            currentProject,
            toDoID,
            format(new Date(dateInput.value), "MM-dd-yyyy")
          );
        });
      },
      { once: true }
    );
  });
}

const setUpDeleteToDoBtns = () => {
  const deleteBtns = document.querySelectorAll(".card-btns .delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const toDoId = e.target.parentElement.parentElement.parentElement.id; // our parent element <div class="todo-card"> is by default created with the corresponding ToDo ID
      Storage.deleteAllToDos(toDoId);
      renderProjectToDoDivs(currentProject);
    });
  });
};

function setUpShowDetailsBtns() {
  const showDetailsBtns = document.querySelectorAll(
    ".card-btns .show-more-btn"
  );
  showDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const toDoDetailsEl =
        e.target.parentElement.parentElement.parentElement.lastChild;
      const toDoDetailsElAttr = toDoDetailsEl.getAttribute("style");
      if (toDoDetailsElAttr === "display: none") {
        toDoDetailsEl.style.display = null;
      } else {
        toDoDetailsEl.setAttribute("style", "display: none");
      }
    });
  });
}

function setUpEditToDoDescription() {
  const descriptionInfoSpans = document.querySelectorAll(".description-info");

  for (const spanEl of descriptionInfoSpans) {
    spanEl.contentEditable = true;
    spanEl.addEventListener("input", (e) => {
      const toDoID = e.target.parentElement.parentElement.parentElement.id;
      const newDescription = e.target.textContent.trim();
      Storage.editDescription(currentProject, toDoID, newDescription);
    });
  }
}

function setUpChangeToDoPriority() {
  const toDoPrioritySpans = document.querySelectorAll(".todo-priority");

  toDoPrioritySpans.forEach((span) => {
    span.addEventListener(
      "click",
      (e) => {
        const clickedSpan = e.target;
        const toDoID = clickedSpan.parentElement.parentElement.id;
        const toDoObj = Storage.getToDoObj(currentProject, toDoID);
        const priorityDOMelement = DOM.toDoPrioritySelectElement();
        clickedSpan.textContent = "";
        clickedSpan.append(priorityDOMelement);
        priorityDOMelement.addEventListener("change", () => {
          const toDoCardDiv = document.getElementById(toDoID);
          toDoCardDiv.classList.remove(toDoObj.getPriority());
          toDoObj.changePriority(priorityDOMelement.value);
          Storage.changePriority(
            currentProject,
            toDoID,
            priorityDOMelement.value
          );
          toDoCardDiv.classList.add(toDoObj.getPriority());
        });
      },
      { once: true }
    );
  });
}

function setUpToDosInteractivity() {
  setUpDeleteToDoBtns();
  setUpShowDetailsBtns();
  if (currentProject === "Today" || currentProject === "This Week") {
    // if inside Today or This Week do not setup editing ToDos details because they won't be saved!
    return;
  }
  setUpEditToDoTitle();
  setUpEditDueDate();
  setUpChangeToDoPriority();
  setUpEditToDoDescription();
}

export { initDomLoad, initUI };
