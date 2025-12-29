import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Createnewpost from './pages/Createnewpost'
import Editpost from './pages/Editpost'
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<Createnewpost/>}/>
      <Route path="/edit-post/:id" element={<Editpost/>}/>
      
    </Routes>
    </>
  )
}

export default App
  