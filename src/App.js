import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Update from "./Components/Update/Update";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import("./App.css");
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
