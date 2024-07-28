import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import './Account.scss'
interface UserParams {
    id: number;
    name: string;
    lastName: string;
    avatar: string;
    email: string;
}


const Account = () => {
    const [user, setUser] = useState<UserParams | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        profileUser()
    },[])
 
    const profileUser = async() =>{
        let lokal = localStorage.getItem('id')
        await fetch(`https://66a559915dc27a3c190b4d0f.mockapi.io/user/${lokal}`, {
            method:'GET'
        })
        .then((res) =>{
            return res.json()
        })
        .then((data) => {
            setUser(data)
            console.log(data)
        })
    }

    const exit = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('flag')
        navigate('/')
    }

  return (
    <div>
        <Header/>
         {user ? 
         <div className='border__user'>
            <img className='avatar' src={user.avatar} alt={user.name} />
            <div className='info'>
                <p className='name'>{user.name}</p> 
                <p className='lastName'>{user.lastName}</p>        
            </div>

            <p className='email'>{user.email}</p>
         

            <button className='exit' onClick={exit}>Выход</button>
         </div>
         : <p>Loading...</p>
         }

    </div>
  )
}

export default Account