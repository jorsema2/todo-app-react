import React, { useState } from "react";
import ReactDOM from "react-dom";


function TodoApp() {
  const [tasks, setTasks] = useState([
    {
      name: 'Fix bike',
      delete: false
    }, {
      name: 'Clean room',
      delete: false
    }
  ]);

  const [value, setValue] = useState('')

  function handleForm(e) {
    e.preventDefault();
    setTasks(tasks.concat({name: value, delete: false}));
    setValue('');
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  const taskList = tasks.map((task, index) =>
  <div key = {tasks.name}>
    <li>{tasks[index].name}</li>
    <button onClick={() => deleteTask(index)}>Delete</button>
  </div>
  )

  return (
    <div>
      <ul>{taskList}</ul>
      <form onSubmit={handleForm}>
        <input onChange={handleChange} type="text" value={value}></input>
        <button>Add task to list</button>
      </form>
    </div>
  );
}

ReactDOM.render(<TodoApp />, document.getElementById("root"));
