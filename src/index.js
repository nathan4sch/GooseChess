import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
//import Game from './components/Game.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Game from "./pages/Game";


export default function App() {
  /*
  const [connection, setConnection] = useState(null);

  useEffect(() => { 
    setConnection(new WebSocket("ws://18.188.216.102:8080"))

    console.log(connection);
  }, [])
  */
  
  return (
    <BrowserRouter>
      <Routes>
            <Route path ="/" element={<Home/>} />
            <Route path = "game" element={<Game/>} />
            <Route path = "*" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

