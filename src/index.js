import React, {useState} from "react";
import ReactDOM from "react-dom";

function TodoApp() {
  const [tasks, setTasks] = useState([
    {
      name: "Fix bike",
      completed: true,
    },
    {
      name: "Clean room",
      completed: false,
    },
  ]);

  const [value, setValue] = useState("");

  function handleForm(e) {
    e.preventDefault();
    const newTasks = [...tasks, {name: value, completed: false}]
    setTasks(newTasks);
    setValue("");
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function deleteTask(task) {
    setTasks(tasks.filter(el => el.name !== task.name));
  }

  function completedTask(task){
    const newTasks = tasks.map(el => {
      if(el.name === task.name){
        el.completed = !el.completed;
      }

      return task;
    });

    setTasks(newTasks);
  }

  const taskList = tasks.map((task) => (
    <div key={task.name} style={{ background: task.completed ? 'pink': 'white' }} >
      <li>{task.name}</li>
       <button onClick={() => completedTask(task)}>Complete</button>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </div>
  ));

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
/**
 * 
 * function useState(value){
    let initialValue = value;
    function changeValue(newValue){
        initialValue = newValue;
    }

    return [initialValue, changeValue];
}

       data     update data         DB   initial value
const [tasks,   setTasks       ] = useState([])




class Todo extends React.Component {
    state ={
        todos: [], 
        value: ''
    }

    deleteTodos(){
        this.setState({ todos: [1,2,3,4], value: 'dog' })
    }


}
 */

ReactDOM.render(<TodoApp />, document.getElementById("root"));
