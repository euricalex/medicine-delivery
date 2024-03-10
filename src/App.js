import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import './scss/app.scss'
import './scss/main.scss'
import Cart from "./components/Cart";

function App() {
  return (
    <div className="content">
      <Header />
      <Routes>
       <Route  path="/" element={<Main />}/>
       <Route path="/cart" element={<Cart />}/>
      </Routes>
    
    </div>
  );
}

export default App;
