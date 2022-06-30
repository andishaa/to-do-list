const savedToDos = [];

const ToDoFactory = (title, desctiption, dueDate, priority) => {
    const toDo = {};

    toDo.ID = crypto.randomUUID();
    toDo.title = title;
    toDo.desctiption = desctiption;
    toDo.dueDate = dueDate;
    toDo.priority = priority;

    savedToDos.push(toDo); // on new toDo creation always add it to the savedToDos array

    toDo.remove = (toDoID) => {
        const toDoToRemove = savedToDos.findIndex((toDo) => toDo.ID === toDoID);
        savedToDos.splice(toDoToRemove, 1);
    }

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

export { ToDoFactory, savedToDos };