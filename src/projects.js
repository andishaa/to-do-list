export default class Project {
  constructor(name) {
    this.name = name;
    this.savedToDos = [];
  }

  getName() {
    return this.name;
  }

  editName(newName) {
    this.name = newName.trim();
  }

  addToDo(toDo) {
    this.savedToDos.push(toDo);
  }

  deleteToDo(toDoID) {
    const toDoToDelete = this.savedToDos.findIndex(
      (toDo) => toDo.ID === toDoID
    );
    if (toDoToDelete !== -1) {
      this.savedToDos.splice(toDoToDelete, 1);
    }
  }

  clearSavedToDos() {
    this.savedToDos = [];
  }

  setSavedTodos(array) {
    this.savedToDos = array;
  }

  getSavedTodos() {
    return this.savedToDos;
  }
}
