import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  return (
    <div className='header'>
        <ul className='header__list'>
            <Link to={'/home'}>
              <li className='task'>
                  Задачи
              </li>
            </Link>
            <Link to={'/account'} >
              <li className='profile'>
                  Профиль
              </li>
            </Link>
            
        </ul>
    </div>
  )
}

export default Header