import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import Create from './Components/Create';
import Update from './Components/Update';
import Read from './Components/Read';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FormItem from './Components/FormItem';
//import DisplayItem from './Components/DisplayItem'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/Create' element={<Create />}></Route>
      <Route path='/Read/:id' element={<Read />}></Route>
      <Route path='/Update/:id' element={<Update/>}></Route>

    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
