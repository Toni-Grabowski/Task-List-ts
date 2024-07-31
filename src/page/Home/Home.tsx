import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import Modal from "../../components/Modal/Modal"
import './Home.scss'
import ModalRedact from '../../components/ModalRedact/ModalRedact'


interface Task {
  id: string;
  heading: string;
  text: string;
}

interface User {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
  lastName: string;
  email: string;
  password: string;
  task: Task[];
}

const Home = () => {
  const [modalFlag, setModalFlag] = useState<boolean>(false);
  const [taskUser, setTaskUser] = useState<User | null>(null);
  const [redconFlag, setRedconFlag] = useState<boolean>(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState<string | null>(null);
  const lokal = localStorage.getItem('id');

  useEffect(() => {
    task();
  }, []);

  const task = async () => {
    const response = await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${lokal}`, {
      method: 'GET',
    });
    const data = await response.json();
    setTaskUser(data);
  };

  const addTask = (newTask: Task) => {
    if (taskUser) {
      setTaskUser({ ...taskUser, task: [...taskUser.task, newTask] });
    }
  };

  const deleteTask = async (id: string) => {
    if (!taskUser) return;

    const updatedTasks = taskUser.task.filter((item) => item.id !== id);
    const updatedUser = { ...taskUser, task: updatedTasks };
    setTaskUser(updatedUser);

    await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${taskUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
  };

  const redTask = (id: string) => {
    setTaskIdToEdit(id);
    setRedconFlag(true);
  };

  return (
    <div>
      <Header />
        <button className="AddTack" onClick={() => setModalFlag(!modalFlag)}>
            +
        </button>
      <main className="main">
        {modalFlag && (
          <div className="modal-container">
            <Modal modalFlag={modalFlag} addTask={addTask} setModalFlag={setModalFlag} />
          </div>
        )}
        {redconFlag && taskIdToEdit && (
          <ModalRedact
            taskUser={taskUser}
            setTaskUser={setTaskUser}
            taskId={taskIdToEdit}
            redconFlag={redconFlag}
            setRedconFlag={setRedconFlag}
          />
        )}
        {taskUser &&
          taskUser.task.map((item, index) => (
            <div className="task-item" key={index}>
                  <p className="task-heading">
                    {item.heading.length > 100 ? item.heading.substring(0, 100) + '...' : item.heading}
                  </p>
                  <p className="task-text">
                    {item.text.length > 200 ? item.text.substring(0, 200) + '...' : item.text}
                  </p>
              <button className="task-delete-button" onClick={() => deleteTask(item.id)}>
                Удалить
              </button>
              <button className="task-edit-button" onClick={() => redTask(item.id)}>
                Открыть задачу
              </button>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Home;