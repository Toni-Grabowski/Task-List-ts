import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import Modal from "../../components/Modal/Modal"
import './Home.scss'
import ModalRedact from "../../components/ModalRedact/ModalRedact";


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
  const[modalFlag, setModalFlag] = useState<boolean>(false)
  const[taskUser, setTaskUser] = useState<User | null>(null)
  const[redconFlag, setRedconFlag] = useState<boolean>(false)

  const lokal = localStorage.getItem('id');
  useEffect(() => {
    task()
  },[])



  const task = async() => {
    await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${lokal}`, {
      method:'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      setTaskUser(data)
     
    })
  }

  const addTask = (newTask: Task) => {
      setTaskUser({...taskUser,task: [...taskUser.task, newTask]});
  };


  const deleteTask = (id: string) => {
    if (!taskUser) return;
    
    const updatedTasks = taskUser.task.filter((item) => item.id !== id);
    const updatedUser = { ...taskUser, task: updatedTasks };
    setTaskUser(updatedUser);
  
    fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${taskUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
  };



const redTask = () => {
  setRedconFlag(true)
}

  return (
    <div>
      
        <Header/>
        <main className="main">

            <button className="AddTack" onClick={() => setModalFlag(!modalFlag)}>+</button>
            {
              modalFlag ? 
              <div>
                  <Modal modalFlag={modalFlag} addTask={addTask}  setModalFlag={setModalFlag}  />
              </div>
              :null
            }

            {
              redconFlag ?
                <ModalRedact taskUser={taskUser} setTaskUser={setTaskUser} />
                : null
              
            }

{taskUser ? (
      taskUser.task.map((item, index) => (
        <div key={index}>
          <p>{item.heading}</p>
          <p>{item.text}</p>
          <button onClick={() => deleteTask(item.id)}>Удалить</button>
          <button onClick={redTask }>Редактировать</button>
        </div>
      ))
    ) : null}
        </main>
    </div>
  )
}

export default Home