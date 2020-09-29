const getFilterActive = (todoList) => todoList.filter(({ status }) => !status);

const getFilterCompleted = (todoList) =>
  todoList.filter(({ status }) => status);

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

  const onSetFilter = (filter) => {
  setState({ filter });
  document.getElementById("name-of-status").innerHTML = nameOfStatus;
  document.getElementById(`${filter}`).style.background = "#7a7a7a";
};


const inputNewTodo = `  <input name="status" type="checkbox" class="check" />
                        <input
                          type="text"
                          placeholder="New todo"
                          name="title"
                          class="input"
                          /><button type="submit" class="button" id="btn">Добавить планы</button>
                     `;

const nameOfStatus = `
                          <button
                            class="text-of-status"
                            id="all"
                            onclick="onSetFilter('all')"
                          >
                            all
                          </button>
                          <button
                            class="text-of-status"
                            id="active"
                            onclick="onSetFilter('active')"
                          >
                            active
                          </button>
                          <button
                            class="text-of-status"
                            id="completed"
                            onclick="onSetFilter('completed')"
                          >
                            completed
                          </button>
                      `;

const render = ({ todos, editTodoId, filter }) => `
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
    <tr>          
      <td><button class="delete" id='delete' onclick='onRemoveTodo(${
        todo.id
      })'>&#10008</button></td>
      <td><button class="complete" id='complete' onclick='onChangeStatusTodo(${
        todo.id
      })')'>&#10004</button></td>
      <td class="do-list ${todo.status ? ` complete-do"` : `"`}
        >${todo.title}</td>
    </tr>`,
    )
    .join(" ")}
    `;

let state = {
  todos: [],
  editTodoId: null,
  filter: "all",
};

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

const onEditTodo = (editTodoId) => {
  setState({
    editTodoId,
  });
};

const main = () => {
  document.getElementById("doTable").innerHTML = render(state);
};

main();

const addTodo = (todoList, { title, status = false }) => [
  ...todoList,
  { id: generateId(), title, status },
];

const deleteTodo = (todoList, todoId) =>
  todoList.filter(({ id }) => id !== todoId);

function toggleStatusTodo(todoList, todoId) {
  return todoList.map((item) =>
    item.id === todoId ? { ...item, status: !item.status } : item,
  );
}

const changeNameTodo = (todoList, todoId, name) =>
  todoList.map((todo) => (todo.id === todoId ? { ...todo, name } : todo));

const onNewAdd = (formElement, event) => {
  event.preventDefault();
  const formData = getForm(formElement);
  const newData = {
    title: formData.title,
    status: formData.status === "on",
  };
  setState({ todos: addTodo(state.todos, newData) });
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
    todos: deleteTodo(state.todos, todoId),
  });
};

const onChangeStatusTodo = (todoId) => {
  setState({
    todos: toggleStatusTodo(state.todos, todoId),
  });
};
