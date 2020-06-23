import React, { useState } from "react";
import ReactDOM from "react-dom";


function TodoApp(props) {
  const [tasks, setTasks] = useState([
    "Fix bike",
    "Clean room",
    "Look to the wall",
  ]);
  const [value, setValue] = useState('')
  function handleForm(e) {
    e.preventDefault();
    setTasks([...tasks, value]);
    setValue('');
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <div style={{color:value}}>
      <ul>
        {tasks.map((task) => (
          <li>{task}</li>
        ))}
      </ul>
      <form onSubmit={handleForm}>
        <input onChange={handleChange} type="text" value={value}></input>
        <button>Add task to list</button>
      </form>
    </div>
  );
}

ReactDOM.render(<TodoApp />, document.getElementById("root"));
