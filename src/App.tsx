import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Birds from "./Birds";
import Map from "./Map";

function App() {
  const [childData, setChildData] = useState({ lat: 51.505, lng: -0.09 });

  return (
    <Routes>
      <Route
        path="/"
        element={<Map childData={childData} setChildData={setChildData} />}
      ></Route>
      <Route path="/Birds" element={<Birds />}></Route>
    </Routes>
  );
}

export default App;
