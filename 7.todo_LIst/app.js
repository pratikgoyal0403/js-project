const input = document.querySelector("#input-feild");
const todoWrapper = document.querySelector(".todo-items");
const addBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-btn");
let checkBtn, editBtn, removeBtn;
let todos = [];

const addTodoHandler = () => {
  const text = input.value;
  input.value = "";
  todos.push({ text: text });
  setItemsToStorage();
  renderTodos();
};
const setItemsToStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const getItemsFromLocalStorage = () => {
  todos.push(...JSON.parse(localStorage.getItem("todos")));
  todos.map((el, index) => {
    html = `<div class="todo" data-id=${index}>
        <p class="todo-text">${el.text}</p>
            <div class="todo-icons">
                <span class="glyphicon glyphicon-ok-circle"></span>
                <span class="glyphicon glyphicon-edit"></span>
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
        </div>`;
    todoWrapper.insertAdjacentHTML("beforeend", html);
  });

  selectDynamicBtns();
};
const renderTodos = () => {
  let html;
  todos.map((el, index) => {
    html = `<div class="todo" data-id=${index}>
      <p class="todo-text">${el.text}</p>
          <div class="todo-icons">
              <span class="glyphicon glyphicon-ok-circle"></span>
              <span class="glyphicon glyphicon-edit"></span>
              <span class="glyphicon glyphicon-remove-circle"></span>
          </div>
      </div>`;
  });
  //   const html = `<div class="todo">
  //          <p class="todo-text">${text}</p>
  //              <div class="todo-icons">
  //                  <span class="glyphicon glyphicon-ok-circle"></span>
  //                  <span class="glyphicon glyphicon-edit"></span>
  //                  <span class="glyphicon glyphicon-remove-circle"></span>
  //              </div>
  //          </div>`;
  todoWrapper.insertAdjacentHTML("beforeend", html);

  selectDynamicBtns();
};
const clearTodos = () => {
  todos = [];
  todoWrapper.innerHTML = "";
  localStorage.setItem("todos", todos);
};
const completedTask = e => {
  console.log(e.target);
  const todoText = e.target.parentElement.previousElementSibling;
  todoText.classList.toggle("completed");
  e.target.classList.toggle("faded");
};
const editTask = e => {
  const textElement = e.target.parentElement.previousElementSibling;
  const id = textElement.parentElement.dataset.id;
  textElement.parentElement.remove();
  todos.splice(id, 1);
  input.value = textElement.textContent;
};
const removeTask = e => {
  const parent = e.target.parentElement.parentElement;
  const id = parent.dataset.id;
  parent.remove();
  todos.splice(id, 1);
};

const selectDynamicBtns = () => {
  checkBtn = Array.from(document.querySelectorAll(".glyphicon-ok-circle"));
  editBtn = Array.from(document.querySelectorAll(".glyphicon-edit"));
  removeBtn = Array.from(document.querySelectorAll(".glyphicon-remove-circle"));
  checkBtn.map(el => {
    el.addEventListener("click", completedTask.bind(event));
  });
  editBtn.map(el => {
    el.addEventListener("click", editTask.bind(event));
  });
  removeBtn.map(el => {
    el.addEventListener("click", removeTask.bind(event));
  });
};

if (localStorage.getItem("todos")) {
  getItemsFromLocalStorage();
}
document.addEventListener("keypress", e => {
  if (e.keyCode === 13) {
    addTodoHandler();
  }
});
addBtn.addEventListener("click", addTodoHandler);
clearBtn.addEventListener("click", clearTodos);

//Completed
