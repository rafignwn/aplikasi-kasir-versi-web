import { Toaster } from "react-hot-toast";
import Casier from "./pages/Casier";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Management from "./layouts/Management";
import Dashboard from "./pages/Dashboard";
import Produk from "./pages/Produk";

function App() {
  return (
    <>
      <div className="w-full h-full">
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cashier" element={<Casier />} />
            <Route element={<Management />}>
              <Route path="/management" element={<Dashboard />} />
              <Route path="/produk" element={<Produk />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
