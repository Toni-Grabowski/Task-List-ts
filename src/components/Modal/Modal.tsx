import React, { FC } from 'react'
import './Modal.scss'
interface ModalProps {
    modalFlag: boolean;
    setModalFlag: object;
}

const Modal: FC<ModalProps> = ({ modalFlag, setModalFlag} ) => {
  return (
    <div className={`modal ${modalFlag ? 'modal--active' : ''}`}>
            <div className="modal__content">
                <button className="modal__close-button" onClick={() => setModalFlag(!modalFlag)}>x</button>
                <input className="modal__input" type="text" placeholder="Введите заголовок" />
                <textarea className="modal__textarea" placeholder="Введите текст"></textarea>
                <button className="modal__create-button">Создать</button>
            </div>
        </div>
  )
}

export default Modal