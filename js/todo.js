const hfds=2;

const getFilterActive = (toDoList) => toDoList.filter(({ status }) => !status);

const getFilterCompleted = (toDoList) =>
  toDoList.filter(({ status }) => status);

const generateId = (() => {
  let count = 0;
  return () => ++count;
})();
const filterTodos = (todos, filter) =>
  filter === "all"
    ? todos
    : filter === "active"
    ? getFilterActive(todos)
    : filter === "completed"
    ? getFilterCompleted(todos)
    : todos;

const onSetFilter = (filter, id) => {
  setState({ filter });
  document.getElementById("name-of-status").innerHTML = nameOfStatus;
  document.getElementById(`${id}`).style.background = "#7a7a7a";
};

const render = ({ todos, editTodoId, filter }) =>
  `
         ${filterTodos(todos, filter)
           .map((todo) =>
             todo.id === editTodoId
               ? `
        
        <tr>
          <td><button class="delete" id='delete' onclick='onRemoveTodo(${todo.id})'>&#10008</button></td>
          <td><button class="complete" id='complete' onclick='onChangeStatusTodo(${todo.id})'>&#10004</button></td>
          <td name='title' type='text' class="do-list">${todo.title}</td>
        </tr>
        `
               : `
        <tr >          
          <td><button class="delete" id='delete' onclick='onRemoveTodo(${
            todo.id
          })'>&#10008</button></td>
          <td><button class="complete" id='complete' onclick='onChangeStatusTodo(${
            todo.id
          })')'>&#10004</button></td>
          <td class="do-list ${todo.status ? ` complete-do"` : `"`}
           >${todo.title}</td>
          </tr>`
           )
           .join(" ")}
                 
    `;

let state = {
  todos: [
    { id: generateId(), title: "title", status: false },
    { id: generateId(), title: "Complete", status: true },
    { id: generateId(), title: "Bar", status: false },
    { id: generateId(), title: "Complete", status: true },
    { id: generateId(), title: "Edit", status: false },
    { id: generateId(), title: "complete", status: true },
  ],
  editTodoId: 0,
  filter: "all",
};
const inputNewTodo = `<form onsubmit="onNewAdd(this, event)" class="new-do" id='form'>
                        <input name="status" type="checkbox" class="check" />
                        <input
                          type="text"
                          placeholder="New todo"
                          name="title"
                          class="input"
                          /><button type="submit" class="button" id="btn">Добавить планы</button>
                      </form>`;

const nameOfStatus = `<div class="name-of-status" id='name-of-status'>
                          <button
                            class="text-of-status"
                            id="all"
                            onclick="onSetFilter('all', 'all')"
                          >
                            all
                          </button>
                          <button
                            class="text-of-status"
                            id="during"
                            onclick="onSetFilter('active', 'during')"
                          >
                            active
                          </button>
                          <button
                            class="text-of-status"
                            id="completed"
                            onclick="onSetFilter('completed', 'completed')"
                          >
                            completed
                          </button>
                      </div>`;

const renderToDom = (template) => {
  document.getElementById("doTable").innerHTML = template;
};
const setState = (newStatePart) => {
  state = { ...state, ...newStatePart };
  const upgrade = render(state);
  renderToDom(upgrade);
};
const clearCompleted = () => {
  setState({ todos: getFilterActive(state.todos) });
};

const clearDuring = () => {
  setState({ todos: getFilterCompleted(state.todos) });
};

const main = () => {
  document.getElementById("doTable").innerHTML = render(state);
};
const filterAll = () => {
  document.getElementById("doTable").innerHTML = render(stateBegin);
};
main();

const addToDo = (toDoList, { title, status = false }) => [
  ...toDoList,
  { id: generateId(), title: title, status: status },
];

const deleteToDo = (toDoList, toDoId) =>
  toDoList.filter(({ id }) => id !== toDoId);

function changeStatusToDo(toDoList, toDoId) {
  const Id = toDoList.findIndex((toDoList) => toDoList.id == toDoId);
  toDoList[Id].status = toDoList[Id].status ? false : true;
  return [...toDoList];
}

const changeNameToDo = (toDoList, toDoId, name) =>
  toDoList.map((toDo) => (toDo.id === toDoId ? { ...toDo, name } : toDo));

const onNewAdd = (formElement, event) => {
  event.preventDefault();

  const formData = getForm(formElement);
  const newData = {
    title: formData.title,
    status: formData.status === "on",
  };
  setState({ todos: addToDo(state.todos, newData) });
  document.getElementById("form").innerHTML = inputNewTodo;
};

const getForm = (formElement) => {
  const formData = new FormData(formElement);
  const data = {};
  for (let [key, values] of formData.entries()) {
    data[key] = values;
  }
  return data;
};

const onRemoveTodo = (todoId) => {
  setState({
    todos: deleteToDo(state.todos, todoId),
  });
};

const onChangeStatusTodo = (todoId) => {
  setState({
    todos: changeStatusToDo(state.todos, todoId),
  });
};
