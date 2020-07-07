import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";

const TaskItem = (props) => {
  const myInput = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.task.name);

  useEffect(() => {
    console.log("I have been changed!", editMode);
    if (editMode) {
      myInput.current.focus();
    }
  }, [editMode]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setEditMode(!editMode);
    props.updateTasks({...props.task, name: value});
  };

  return (
    <div>
      <div
        key={props.task.name}
        style={{background: props.task.completed ? "pink" : "white"}}
      >
        {!editMode && <li onClick={() => setEditMode(!editMode)}>{value}</li>}
        {editMode && (
          <input
            onChange={handleChange}
            ref={myInput}
            value={value}
            onBlur={handleBlur}
          />
        )}
        <button onClick={() => props.completedTask(props.task)}>
          Complete
        </button>
        <button onClick={() => props.deleteTask(props.task)}>Delete</button>
      </div>
    </div>
  );
};

function TodoApp() {
  const [tasks, setTasks] = useState([
    {
      name: "Fix bike",
      completed: true,
      update: false,
      id: `${Math.random()}-${Math.random()}`,
    },
    {
      name: "Clean room",
      completed: false,
      update: false,
      id: `${Math.random()}-${Math.random()}`,
    },
  ]);

  const [value, setValue] = useState("");

  function handleForm(e) {
    e.preventDefault();
    const newTasks = [
      ...tasks,
      {name: value, completed: false, id: `${Math.random()}-${Math.random()}`},
    ];
    setTasks(newTasks);
    setValue("");
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function deleteTask(task) {
    setTasks(tasks.filter((el) => el.name !== task.name));
  }

  function completedTask(task) {
    const newTasks = tasks.map((el) => {
      if (el.id === task.id) {
        el.completed = !el.completed;
      }
      return el;
    });
    setTasks(newTasks);
  }

  const updateTasks = (task) => {
    console.log(task);
    const newTasks = tasks.map((el) => {
      if (el.id === task.id) {
        return task;
      }
      return el;
    });

    setTasks(newTasks)
  };

  const taskList = tasks.map((task) => (
    <TaskItem
      task={task}
      deleteTask={deleteTask}
      completedTask={completedTask}
      updateTasks={updateTasks}
    />
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

ReactDOM.render(<TodoApp />, document.getElementById("root"));

/*

import React, {useState} from "react";
import ReactDOM from "react-dom";

function TodoApp() {
  const [tasks, setTasks] = useState([
    {
      name: "Fix bike",
      completed: true,
      update: false
    },
    {
      name: "Clean room",
      completed: false,
      update: false
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
      return el;
    });
    // Ask Cristian later through a loom video:
    // console.log(newTasks);
    setTasks(newTasks);
    // console.log(tasks);
  }

  function updateTask(task) {

    const newTasks = tasks.map(el => {

      if(el.name === task.name){
        el.update = !el.update;
      }
      return el;
    });

    setTasks(newTasks);
  }

  function NewInput() {
    const [input, setInput] = useState("");

    function updateInput(e) {
      e.preventDefault();
      const renameTasks = tasks.map(el => {
        if(el.update === true) {
          el.name = input;
          el.update = false;
        }
        return el;
      });
      setTasks(renameTasks);
    }
  
    function handleInput(e) {
      console.log(input);
      setInput(e.target.value);
    }
    
    return(
      <div>
        <form onSubmit={updateInput}>
          <input onChange={handleInput} type="text" value={input}></input>
          <button>Update task</button>
        </form>
      </div>
    )
  }

  const taskList = tasks.map((task) => (
    <div>
      <div key={task.name} style={{ background: task.completed ? 'pink': 'white' }} >
        <li>{task.name}</li>
        <button onClick={() => updateTask(task)}>Update</button>
        <button onClick={() => completedTask(task)}>Complete</button>
        <button onClick={() => deleteTask(task)}>Delete</button>
        {task.update === true &&
          <NewInput />
        }
      </div>      
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
*/

/*** */
/*** */
/*** */
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
