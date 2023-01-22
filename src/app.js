import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Game from "./pages/Game";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>}>
            <Route index element={<Home/>} />
            <Route path = "game" element={<Game/>} />
          <Route path = "*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}