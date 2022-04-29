"use strict";
const todo = new Todo();

const todoInput = document.querySelector("#getTodoInput");
const todoListContainer = document.querySelector("#todoListContainer");

const key = "todoStorage";

const updateLocalStorage = () => {
  localStorage.setItem(key, JSON.stringify(todo.getTodos()));
};

const emptyNode = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const renderList = () => {
  emptyNode(todoListContainer);
  todo.getTodos().map((todo) => {
    const LI = document.createElement("li");
    const DIV = document.createElement("div");
    const INPUT = document.createElement("input");
    const SPAN = document.createElement("span");

    DIV.classList.add("input-box");
    INPUT.type = "text";
    INPUT.value = todo.value;
    INPUT.setAttribute("disabled", "");
    INPUT.setAttribute("id", `input${todo.id}`);
    INPUT.setAttribute("onKeyUp", "onInputEdit(event)");
    SPAN.classList.add("cross-icon");
    SPAN.innerText = "X";
    SPAN.setAttribute("id", todo.id);

    DIV.appendChild(INPUT);
    DIV.appendChild(SPAN);
    LI.appendChild(DIV);
    todoListContainer.appendChild(LI);
  });
  updateLocalStorage();
};

function addTodo() {
  const inputValue = todoInput.value;

  if (inputValue === "") {
    alert("enter valid todo");
    return;
  }
  // check if todo is already added
  let isTodoPresent = false;
  todo.getTodos().forEach((todo) => {
    if (todo.value === inputValue) isTodoPresent = true;
  });

  if (!isTodoPresent) {
    todo.addTodo(inputValue);
  } else {
    alert("todo is already present in list");
  }
  emptyInputField();
  renderList();
}

function handleClick(e) {
  if (e && e.target && e.target.id && e.target.nodeName === "SPAN") {
    todo.deleteTodo(e.target.id);
    renderList();
  }
}

function makeInputEditable(event) {
  const id = event.target.id;
  if (!id) return;
  const inputBox = document.querySelector("#" + id);
  inputBox.removeAttribute("disabled");
}

function onInputEdit(e) {
  if (e.key !== "Enter") return;

  const id = e.target.id.slice(5);
  if (!id) return;

  const value = e.target.value;
  todo.updateTodo(id, value);
  renderList();
}

const emptyInputField = () => {
  todoInput.value = "";
};

(() => {
  const localTodos = localStorage.getItem(key);
  if (localTodos) {
    todo.setTodos(JSON.parse(localTodos));
    renderList();
  }
})();