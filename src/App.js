import { Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Auth/Login";
import Home from "./Components/pages/Home";
import Layout from "./Components/Layout";
import CreateEstate from "./Components/pages/CreateEstate";
import SearchEstate from "./Components/pages/SearchEstate";
import CreatePersonnel from "./Components/pages/CreatePersonnel";
import SearchPersonnel from "./Components/pages/SearchPersonnel";
import Settings from "./Components/pages/Settings";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-estate" element={<CreateEstate />} />
          <Route path="/search-estate" element={<SearchEstate />} />
          <Route path="/create-personnel" element={<CreatePersonnel />} />
          <Route path="/search-personnel" element={<SearchPersonnel />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </>
  );
}

export default App;
