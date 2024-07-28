import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss'
const Register = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name:'',
        lastName:'',
        email: '',
        password:''
    })

    useEffect(() => {
        submit()
    },[])


    const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = async (e?:React.FormEvent) =>{
            e?.preventDefault()


            if(input.name === '' || input.lastName === '' ||  input.email === '' || input.password === '') {
                return;
            } 

            await fetch('https://66a559915dc27a3c190b4d0f.mockapi.io/user', {
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(input)
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    localStorage.setItem('id', data.id)
                    localStorage.setItem('flag', 'true')
                    navigate('/home');
                })
        
    }

  return (
    <div className="form-container">
        <input className="form-container__input" type="text" name="name" value={input.name} onChange={inputValue} placeholder="Имя"/>
        <input className="form-container__input" type="text" name="lastName" value={input.lastName} onChange={inputValue} placeholder="Фамилия"/>
        <input className="form-container__input" type="email" name="email" value={input.email} onChange={inputValue} placeholder="Email"/>
        <input className="form-container__input" type="password" name="password" value={input.password} onChange={inputValue} placeholder="Пароль"/>
        
        <button className="form-container__button" onClick={submit}>Отправить</button>

        <p className="form-container__text">Если у вас уже есть аккаунт, то перейдите к <Link className="form-container__link" to={'/autorization'}>авторизации</Link></p>
    </div>

  )
}

export default Register