const render = ({ todos, editTodoId }) =>
  `
         ${todos
           .map((todo) =>
             todo.id === editTodoId
               ? `
        <tr>
          <td class="do-list" value='${todo.title}'></td>
          <td><button class="delete">&#10008</button></td>
          <td><button class="complete">&#10004</button></td>
        </tr>`
               : `
        <tr >
          <td class="do-list ${todo.status ? "complete-do" : ""}">${
                   todo.title
                 }</td>
          <td><button class="delete">&#10008</button></td>
          <td><button class="complete">&#10004</button></td>
        </tr>`
           )
           .join(" ")}
      
    </div>`;

const state = {
  todos: [
    { id: 1, title: "My title", status: false },
    { id: 2, title: "Foo", status: true },
    { id: 3, title: "Bar", status: false },
  ],
  editTodoId: 3,
};

const main = () => {
  document.getElementById("doTable").innerHTML = render(state);
};

const generateId = (() => {
  let _id = 0;
  return () => ++_id;
})();

function addToDo(toDoList, name) {
  if (!name) return;
  let newToDo = {
    id: generateId(),
    status: false,
    name,
  };
  return [...toDoList, newToDo];
}

function deleteToDo(toDoList, toDoId) {
  return toDoList.filter(({ id }) => id !== toDoId);
}

function changeStatusToDo(toDoList, toDoId, status) {
  return toDoList.map((toDo) =>
    toDo.id === toDoId ? { ...toDo, status } : toDo
  );
}

function changeNameToDo(toDoList, name) {
  return toDoList.map((toDo) =>
    toDo.id === toDoId ? { ...toDo, name } : toDo
  );
}
