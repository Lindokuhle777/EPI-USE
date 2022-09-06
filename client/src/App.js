import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainContextProvider } from './MainContext';
import Home from "./components/Home/Home";
import Protected from './Protected';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <MainContextProvider>
      <Routes>
        {/* Protect the / route to that only logged in users can access it. */}
        <Route path="/" exact element={<Protected><Home /></Protected>}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </MainContextProvider>
    </BrowserRouter>
   
  );
}

export default App;
