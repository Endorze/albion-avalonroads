import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/home.tsx"
import Layout from './components/layout/layout.tsx'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />}/>        
      </Route>
    </Routes>
  )
}

export default App
