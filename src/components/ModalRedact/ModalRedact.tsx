import React, { FC, useState, useEffect } from 'react';
import './ModalRedactStyle.scss'
interface InputModal {
  id: string;
  heading: string;
  text: string;
}

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

interface ModalRedactProps {
  taskUser: User | null;
  setTaskUser: React.Dispatch<React.SetStateAction<User | null>>;
  taskId: string | null;
  redconFlag: boolean;
  setRedconFlag: (flag: boolean) => void;
}

const ModalRedact: FC<ModalRedactProps> = ({ taskUser, setTaskUser, taskId, redconFlag, setRedconFlag }) => {
  const [inputModalValue, setInputModalValue] = useState<InputModal | null>(null);

  useEffect(() => {
    if (taskUser && taskId) {
      const taskToEdit = taskUser.task.find((task) => task.id === taskId);
      if (taskToEdit) {
        setInputModalValue(taskToEdit);
      }
    }
  }, [taskUser, taskId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputModalValue((prevValue) => prevValue ? { ...prevValue, [name]: value } : null);
  };

  const handleUpdateTask = async () => {
    if (!taskUser || !inputModalValue) return;

    const updatedTasks = taskUser.task.map((task) =>
      task.id === inputModalValue.id ? inputModalValue : task
    );

    const updatedUser = { ...taskUser, task: updatedTasks };
    setTaskUser(updatedUser);

    await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${taskUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    setRedconFlag(false); 
  };

  if (!inputModalValue) return null;

  return (
    <div className={`modal ${redconFlag ? 'modal--active' : ''}`}>
      <div className="modal__content">
        <button className="modal__close-button" onClick={() => setRedconFlag(!redconFlag)}>x</button>
        <input
          className="modal__input"
          type="text"
          placeholder="Введите заголовок"
          name="heading"
          value={inputModalValue.heading}
          onChange={handleInputChange}
        />
        <textarea
          className="modal__textarea"
          placeholder="Введите текст"
          name="text"
          value={inputModalValue.text}
          onChange={handleInputChange}
        />
        <button className="modal__create-button" onClick={handleUpdateTask}>
          Обновить задачу
        </button>
      </div>
    </div>
  );
};

export default ModalRedact;
