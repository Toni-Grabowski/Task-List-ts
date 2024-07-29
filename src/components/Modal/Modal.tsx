import React, { FC, useEffect, useState } from 'react'
import './Modal.scss'

interface ModalProps {
  modalFlag: boolean;
  setModalFlag: (flag: boolean) => void;
  addTask: (flag: boolean) => void;
}

interface InputModal {
  id: number;
  heading: string;
  text: string;
}

const Modal: FC<ModalProps> = ({ modalFlag, setModalFlag, addTask}) => {
  let currentId = 1
  const [inputModal, setInputModal] = useState<InputModal>({
    id: 0,
    heading: '',
    text: '',
  });



  const inputModalValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputModal({ ...inputModal, [name]: value});
  };

  const createTask = async () => {
    const lokal = localStorage.getItem('id');
    
    let response = await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${lokal}`)
    let data =  await response.json()
    const newId = data.task.length > 0 ? Math.max(...data.task.map(task => task.id)) + 1 : 1;
    const newTask = { ...inputModal, id: newId };
    let result = [...data.task, newTask];

  await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${lokal}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data, id: newTask, task: result })
  })

  addTask(newTask);
  setModalFlag(false);
  };

  return (
    <div className={`modal ${modalFlag ? 'modal--active' : ''}`}>
      <div className="modal__content">
        <button className="modal__close-button" onClick={() => setModalFlag(!modalFlag)}>x</button>
        <input
          className="modal__input"
          type="text"
          placeholder="Введите заголовок"
          name="heading"
          onChange={inputModalValue}
        />
        <textarea
          onChange={inputModalValue}
          className="modal__textarea"
          placeholder="Введите текст"
          name="text"
        />
        <button className="modal__create-button" onClick={createTask}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Modal;
