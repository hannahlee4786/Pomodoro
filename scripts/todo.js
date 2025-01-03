const todoList = [];

renderTodoList();

// Function: goes through todo list
function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoItem = todoList[i];
    const html = `
      <div class="to-do-item">${todoItem}</div> 
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
      " class="delete-todo-button">Delete</button>`;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

// Function: adds a task to the todo list
function addTodo() {
  const inputElement = document.querySelector('.js-add-task');
  const todo = inputElement.value;

  todoList.push(todo);

  inputElement.value = ''; // Makes textbox empty

  renderTodoList();
}

// Function: deletes all tasks in todo list, when trashcan icon is clicked
function deleteAllTasks() {
  todoList.splice(0, todoList.length);
  renderTodoList();
}