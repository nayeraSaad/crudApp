import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
//import Create from './Components/Create';
// import Update from './Components/Update';
import Read from './Components/Read';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEdit from './Components/AddEdit';



function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/create' element={<AddEdit isEditMode={false}/>}></Route>
    <Route path='/update/:id' element={<AddEdit isEditMode={true}/>}></Route>
    <Route path='/Read/:id' element={<Read />}></Route>
      

    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
