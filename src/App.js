import './App.css';
import {Navbar} from './components'
import {Home,Item} from './pages'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
          </Routes>
    </div>
  );
}

export default App;
