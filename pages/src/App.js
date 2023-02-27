import "./App.css";
import Register from "./page/register.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact  element={<Register />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
