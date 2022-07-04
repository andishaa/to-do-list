const ToDoFactory = (title, desctiption, dueDate, priority) => {
    const toDo = {};

    toDo.ID = crypto.randomUUID();
    toDo.title = title;
    toDo.desctiption = desctiption;
    toDo.dueDate = dueDate;
    toDo.priority = priority;

    toDo.editTitle = (newTitle) => {
        toDo.title = newTitle;
    };

    toDo.editDescription = (newDescription) => {
        toDo.desctiption = newDescription;
    }

    toDo.changeDueDate = (newDate) => {
        toDo.dueDate = newDate;
    }

    toDo.changePriority = (newPriority) => {
        toDo.priority = newPriority;
    }

    return toDo;
};

export { ToDoFactory };