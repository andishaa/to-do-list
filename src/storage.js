import { TodoList } from "./TodoList";
import { Project } from "./projects";
import { ToDo } from "./todos";

export class Storage {
    static saveProjects(arr) {
        localStorage.setItem('savedProjects', JSON.stringify(arr));
    }

    static savedProjects() {
        const todoList = Object.assign(
            new TodoList(),
            JSON.parse(localStorage.getItem('savedProjects'))
        )

        todoList.setProjects(
            todoList
                .getProjects()
                .map((project) => Object.assign(new Project(), project))
        )

        todoList.getProjects().forEach(project => {
            project.setSavedTodos(
                project.getSavedTodos()
                    .map((todo) => Object.assign(new ToDo(), todo))
            )
        })
        return todoList;
    }

    static addProject(projectObject) {
        const todoList = Storage.savedProjects();
        todoList.addProject(projectObject);
        Storage.saveProjects(todoList);
    }

    static addToDo(projectName, todoObject) {
        const todoList = Storage.savedProjects();
        todoList.getProjectObj(projectName).addToDo(todoObject);
        Storage.saveProjects(todoList);
    }

    static deleteAllToDos(toDoID) {
        const todoList = Storage.savedProjects();
        todoList.deleteAllToDos(toDoID);
        Storage.saveProjects(todoList);
    }

    static changeToDoTitle(projectName, todoID, newTitle) {
        const todoList = Storage.savedProjects();
        todoList.getToDoObj(projectName, todoID).editTitle(newTitle);
        Storage.saveProjects(todoList);
    }

    static changeDueDate(projectName, toDoID, newDate) {
        const todoList = Storage.savedProjects();
        todoList.getToDoObj(projectName, toDoID).changeDueDate(newDate);
        Storage.saveProjects(todoList);
    }

    static changePriority(projectName, toDoID, newPriority) {
        const todoList = Storage.savedProjects();
        todoList.getToDoObj(projectName, toDoID).changePriority(newPriority);
        Storage.saveProjects(todoList);
    }

    static editDescription(projectName, toDoID, newDescription) {
        const todoList = Storage.savedProjects();
        todoList.getToDoObj(projectName, toDoID).editDescription(newDescription);
        Storage.saveProjects(todoList);
    }

    static deleteProject(projectName) {
        const todoList = Storage.savedProjects();
        todoList.deleteProject(projectName);
        Storage.saveProjects(todoList);
    }

    static checkDuplicateName(projectName) {
        const todoList = Storage.savedProjects();
        return todoList.checkDuplicateName(projectName);
    }

    static getProjectObj(projectName) {
        const todoList = Storage.savedProjects();
        return todoList.getProjectObj(projectName);
    }

    static getToDoObj(projectName, toDoID) {
        const todoList = Storage.savedProjects();
        const currentProject = todoList.getProjectObj(projectName);
        return currentProject.getSavedTodos().find(toDo => toDo.ID === toDoID);
    }

    static updateTodayProject() {
        const todoList = Storage.savedProjects();
        todoList.updateTodayProject();
        Storage.saveProjects(todoList);
    }

    static updateThisWeekProject() {
        const todoList = Storage.savedProjects();
        todoList.updateThisWeekProject();
        Storage.saveProjects(todoList);
    }
}