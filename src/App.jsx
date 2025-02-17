import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AfterLogin from "./pages/AfterLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index Component={HomePage} />
          <Route path="/after" Component={AfterLogin} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
