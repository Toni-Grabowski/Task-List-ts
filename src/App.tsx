import { Route,Routes} from 'react-router-dom';
import './App.scss'
import Home from './page/Home/Home';
import Autorization from './page/Autorization/Autorization';
import Register from './page/Register/Register';
import Account from './page/Account/Account';
function App() {

  return (
    <Routes>
      <Route element={<Register/>} path='/' />
      <Route element={<Home/>} path='/home' />
      <Route element={<Autorization/>} path='/autorization' />
      <Route element={<Account/>} path='/account' />
    </Routes>
   
      

  );
}

export default App
