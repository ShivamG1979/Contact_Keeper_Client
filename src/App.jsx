import React,{ useEffect,useState} from 'react'
import axios from'axios'
import Navbar from './Navbar'
import AddContact from './AddContact'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Getcontact from './Getcontact'

const App = () => {
const [contacts , setContacts] =useState([])
const [id, setId] = useState("")

  return (
    
    <Router>
    
      
      {/* <AddContact/> */}
      {/* <Getcontact/> */}
      
      <Routes>
        <Route path ='/' element= {<Getcontact id={id} setId={setId}/>} />
        <Route path ='/addcontact' element={<AddContact id={id} setId={setId}/>} />

      </Routes> 
    </Router>
  )
}

export default App