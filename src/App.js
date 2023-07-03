import { Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Auth/Login";
import Home from "./Components/pages/Home";
import "./App.css";
import Layout from "./Components/Layout";
import CreateEstate from "./Components/pages/CreateEstate";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-estate" element={<CreateEstate />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
