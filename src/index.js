import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";

function TodoApp() {
  const [tasks, setTasks] = useState([
    {
      name: "Fix bike",
      completed: true,
      update: false,
      priority: 3,
      id: `${Math.random()}-${Math.random()}`,
    },
    {
      name: "Clean room",
      completed: false,
      update: false,
      priority: null,
      id: `${Math.random()}-${Math.random()}`,
    },
  ]);

  const [value, setValue] = useState("");
  
  // Stores deleted tasks:
  const [deletedTasks, setDeletedTasks] = useState([])

  // When true, the recycle bin is open. Otherwise, it remains closed:
  const [binState, setBinState] = useState(false);

  function handleForm(e) {
    e.preventDefault();
    const newTasks = [
      ...tasks,
      {name: value, completed: false, update: false, priority: null, id: `${Math.random()}-${Math.random()}`},
    ];
    setTasks(newTasks);
    setValue("");
  }

  function handleChange(e) {
    setValue(e.target.value);
    console.log(tasks)
  }

  function deleteTask(task) {
    const elminatedTasks = [
      ...deletedTasks, 
      task
    ];
    setDeletedTasks(elminatedTasks);
    const remainingTasks = tasks.filter((el) => el.id !== task.id);
    setTasks(remainingTasks);
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
    const newTasks = tasks.map((el) => {
      if (el.id === task.id) {
        return task;
      }
      return el;
    });

    setTasks(newTasks);
  };

  // Changes task's priority:
  function increasePriority(task) {
    const newTasks = tasks.map((el) => {
      if (el.id === task.id) {

        if (task.priority !== 5) {
          task.priority++;
          console.log(task);
        } else if (task.priority === null) {
          task.priority = 1;
        } else {
          task.priority = null;
        }
      }
      return el;
    });

    setTasks(newTasks);

  }

  // Recovers a task from the recycle bin:
  function recoverTasks(deletedTask) {
    setTasks([...tasks, deletedTask]);
    setDeletedTasks(deletedTasks.filter((el) => el.id !== deletedTask.id));
  }

  // Deletes a task from the recycle bin:
  function deleteTaskForever(deletedTask) {
    setDeletedTasks(deletedTasks.filter((el) => el.id !== deletedTask.id));
  }

  // Recovers all tasks from the recycle bin:
  function recoverAll() {
    const allTasks = tasks.concat(deletedTasks);
    setTasks(allTasks);
    setDeletedTasks([]);
  }

  // Deletes all tasks from the recycle bin:
  function deleteAllTasks() {
    setDeletedTasks([]);
  }

  const TaskItem = (props) => {
    const myInput = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(props.task.name);
  
    useEffect(() => {
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
          {props.task.priority && 
          <button onClick={() => increasePriority(props.task)}>Priority {props.task.priority}</button>}
          {!props.task.priority && 
          <button onClick={() => increasePriority(props.task)}>No priority</button>}
          <button onClick={() => props.completedTask(props.task)}>
            Complete
          </button>
          <button onClick={() => props.deleteTask(props.task)}>Delete</button>
        </div>
      </div>
    );
  };

  const recycleBin = deletedTasks.map((deletedTask) => (
      <ul>
        <li style={{background: deletedTask.completed ? "pink" : "white"}}>{deletedTask.name}</li>
        <button onClick={() => recoverTasks(deletedTask)}>Recover</button>
        <button onClick={() => deleteTaskForever(deletedTask)}>DeleteForever</button>
      </ul>
  ));

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
      <button onClick={() => setBinState(!binState)}>RecycleBin</button>
      {binState === true && 
      <div>
        <div>
          {recycleBin}
        </div>
        <div>
          <button onClick={() => recoverAll()}>Recover all tasks</button>
          <button onClick={() => deleteAllTasks()}>Delete all tasks forever</button>
        </div>
      </div>}
    </div>
  );
}

ReactDOM.render(<TodoApp />, document.getElementById("root"));