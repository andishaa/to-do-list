import { format } from 'date-fns';

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.ID = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), 'MM-dd-yyyy');
        this.priority = priority;
    };

    editTitle(newTitle) {
        this.title = newTitle;
    };

    editDescription(newDescription) {
        this.description = newDescription;
    };

    changeDueDate(newDate) {
        this.dueDate = format(new Date(newDate), 'MM-dd-yyyy');
    };

    changePriority(newPriority) {
        this.priority = newPriority;
    };

    getPriority() {
        return this.priority
    };
}

export { ToDo };