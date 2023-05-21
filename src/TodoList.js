import { Project } from "./projects";
import { format, parse, startOfWeek } from 'date-fns';

class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('This Week'));
    }

    addProject(projectObject) {
        this.projects.push(projectObject);
    }

    setProjects(array) {
        this.projects = array;
    }

    getProjects() {
        return this.projects;
    }

    getProjectObj(projectName) {
        return this.projects.find(project => project.getName() === projectName);
    }

    getToDoObj(projectName, toDoID) {
        const currentProject = this.projects.find(project => project.getName() === projectName);
        return currentProject.getSavedTodos().find(toDo => toDo.getID() === toDoID);
    }

    deleteAllToDos(toDoID) {
        this.projects.forEach(project => {
            project.deleteToDo(toDoID);
        });
    }

    deleteProject(projectName) {
        //in order to remove the saved toDos from the Inbox, we have to delete them by ID also when deleting the Project
        const projectObj = this.getProjectObj(projectName);
        projectObj.getSavedTodos().forEach(toDo => {
            this.deleteAllToDos(toDo.ID);
        });
        const projectToDelete = this.projects.findIndex((project) => project.name === projectName);
        this.projects.splice(projectToDelete, 1);
    }

    updateTodayProject() {
        this.getProjectObj('Today').clearSavedToDos();
        const todaysDate = format(new Date(), 'MM-dd-yyyy');

        this.projects.forEach(project => {
            if (project.getName() === 'Today' || project.getName() === 'This Week') {
                return;
            }
            project.getSavedTodos().forEach(toDo => {
                const toDoDate = toDo.getDueDate();
                if (toDoDate === todaysDate) {
                    this.getProjectObj('Today').addToDo(toDo);
                }
            })
        })
    }

    updateThisWeekProject() {
        this.getProjectObj('This Week').clearSavedToDos();

        this.projects.forEach(project => {
            if (project.getName() === 'Today' || project.getName() === 'This Week') {
                return;
            }
            project.getSavedTodos().forEach(toDo => {
                const toDoDate = toDo.getDueDate();
                if (startOfWeek(new Date()).getTime() === startOfWeek(parse(toDoDate, 'MM-dd-yyyy', new Date())).getTime()) {
                    this.getProjectObj('This Week').addToDo(toDo);
                }
            })
        })
    }

    checkDuplicateName(projectName) {
        const isDuplicate = this.projects.find((project) => project.name.toLowerCase() === projectName.toLowerCase()) !== undefined;
        return isDuplicate; // true or false
    }

}

export { TodoList };