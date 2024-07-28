import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import './Autorization.scss'

interface UserValue {
  email: string;
  password: string;
}

const Autorization = () => {
  const navigate = useNavigate()
  const[inputValue, setInputValue] = useState<UserValue>({
    email: '',
    password: ''
  })

  const inputForm = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const {name, value} = e.target;
      setInputValue({...inputValue, [name]: value})
  }

  useEffect(() => {
    submit()
  },[])

  const submit = async() => {

    if(inputValue.email === '' || inputValue.password === '') {
      return;
  } 

    await fetch('https://66a559915dc27a3c190b4d0f.mockapi.io/user', {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      let res = data.find((user) => user.email === inputValue.email && user.password === inputValue.password);

      if(res) {
        localStorage.setItem('id', res.id)
        localStorage.setItem('flag', 'true')
        navigate('/home')
      }
    
    })
  }

  return (
    <div className="form-container">
      <input className="form-container__input" type="email" name="email" value={inputValue.email} onChange={inputForm} placeholder="Email"/>
      <input className="form-container__input" type="password" name="password" value={inputValue.password} onChange={inputForm} placeholder="Пароль"/>

      <button className="form-container__button" onClick={submit}>Отправить</button>
      <p className="form-container__text">Если у вас еще нет аккаунта, то перейдите к <Link className="form-container__link" to={'/'}>регистрации</Link></p>
    </div>
  )
}

export default Autorization