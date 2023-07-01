import { Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Auth/Login";
import Home from "./Components/pages/Home";
import "./App.css";
import Layout from "./Components/pages/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
