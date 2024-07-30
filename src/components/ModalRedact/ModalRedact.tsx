import React, { FC, useEffect, useState } from 'react'

// {taskUser, setTaskUser}
  
  interface InputModal {
    heading: string;
    text: string;
  }
  
  const ModalRedact: FC = () => {
    const lokal = localStorage.getItem('id');
    const [inputModalValue, setInputModalValue] = useState<InputModal | []>([]);
  
    useEffect(() => {
     input();
    }, [lokal]);
  
    const input = () => {
      fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${lokal}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
        setInputModalValue(data.task);
          
        });
    };
  
    return (
      <>

      {
        inputModalValue.map((item) => (
        <p key={item.id}>{item.heading}</p>
      )
          
        )
      }
      </>
    );
  };
  
  export default ModalRedact;