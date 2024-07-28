import { useState } from "react"
import Header from "../../components/Header/Header"
import Modal from "../../components/Modal/Modal"
import './Home.scss'

const Home = () => {
  const[modalFlag, setModalFlag] = useState<boolean>(false)



  return (
    <div>
        <Header/>
        <main className="main">
            <button className="AddTack" onClick={() => setModalFlag(!modalFlag)}>+</button>

            {
              modalFlag ? 
              <div>
                  <Modal modalFlag={modalFlag}  setModalFlag={setModalFlag}  />
              </div>
              :null
            }
        </main>
    </div>
  )
}

export default Home