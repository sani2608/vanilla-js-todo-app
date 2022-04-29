class Todo {
  constructor() {
    this.todos = [];
  }
  addTodo(value) {
    this.todos.push({ id: this._generateId().toString(), value: value });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  updateTodo(idToUpdate, valueToUpdate) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === idToUpdate)
        return { id: idToUpdate, value: valueToUpdate };
      else return todo;
    });
  }

  isEmpty() {
    return this.todos.length;
  }
  getTodos() {
    return this.todos;
  }

  _generateId() {
    return parseInt(Math.random() * 1000);
  }

  setTodos(todos) {
    this.todos = todos;
  }
}
