/* Send fetch request */
const sendReq = function (url, method, body) {
  fetch(url, {
    method,
    body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    window.location.reload();
  });
};

/* Add todo */
const addTodo = function () {
  console.log("add todo");
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const dueDate = document.getElementById("due-date").value;
  if (!description) {
    alert("Please add a description");
    return;
  }
  const body = { description, category, dueDate };
  sendReq("/addTodo", "POST", JSON.stringify(body));
};

/* Delete Todo */
const deleteTodo = function () {
  console.log("delete todo");
  const deleteListEle = Array.from(
    document.querySelectorAll("#todo-list input[type='checkbox']:checked")
  );
  const deleteTodosIds = deleteListEle.map((ele) => {
    return ele.dataset.id;
  });
  sendReq("/deleteTodos", "POST", JSON.stringify({ deleteTodosIds }));
};

/* Update Todo */
const updateTodo = function () {
  console.log("Update todo");
  const idToBeUpdated = event.target.dataset.id;
  sendReq(
    "/updateTodo",
    "POST",
    JSON.stringify({ idToBeUpdated, keyToBeUpdated: "isTaskDone" })
  );
};

/* Add Event Listener */
document.getElementById("add-todo").addEventListener("click", addTodo);
document.getElementById("delete-todo").addEventListener("click", deleteTodo);
