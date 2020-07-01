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

  const [input, setInput] = useState({
    value: '',
    hidden: true
  });

  function handleForm(e) {
    e.preventDefault();
    setTasks(tasks.concat({name: value, delete: false}));
    setValue('');
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function updateTask(task) {
    console.log('hey');
    if (el => el.name === task.name) {
      console.log('hey');
      return (
        <div>
          <p>Hey</p>
        </div>
      )
    }
  }

  function deleteTask(task) {
    const newTasks = tasks.filter(el => el.name !== task.name);
    setTasks(newTasks);
  }

  function createSomething(e) {
    e.preventDefault();
    input.hidden = !input.hidden;
    if (input.hidden === false) {
      return <div><p>Hey</p></div>;
    };
  }

  const taskList = tasks.map((task) =>
  <div key = {task.name}>
    <li>{task.name}</li>
    <button onClick={() => updateTask(task)}>Update</button>
    <button onClick={() => deleteTask(task)}>Delete</button>
    <form onSubmit={createSomething}>
      <button>Create</button>
    </form>
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

// Link with the right question: https://www.google.com/search?q=show+input+box+when+clicked+react&oq=show+input+box+when+clicked+react&aqs=chrome..69i57j0.12244j0j7&sourceid=chrome&ie=UTF-8