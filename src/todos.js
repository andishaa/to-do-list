import { format } from 'date-fns';

const ToDoFactory = (title, description, dueDate, priority) => {
    const toDo = {};
    //if the user inputs empty Title, don't do anything
    if (title === '') {
        return;
    }

    toDo.ID = crypto.randomUUID();
    toDo.title = title;
    toDo.description = description;
    toDo.dueDate = format(new Date(dueDate), 'MM-dd-yyyy');
    toDo.priority = priority;

    toDo.editTitle = (newTitle) => {
        toDo.title = newTitle;
    };

    toDo.editDescription = (newDescription) => {
        toDo.description = newDescription;
    }

    toDo.changeDueDate = (newDate) => {
        toDo.dueDate = format(new Date(newDate), 'MM-dd-yyyy');
    }

    toDo.changePriority = (newPriority) => {
        toDo.priority = newPriority;
    }

    toDo.getPriority = () => { return toDo.priority };

    return toDo;
};

export { ToDoFactory };