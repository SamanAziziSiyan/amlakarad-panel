import { Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Auth/Login";
import Home from "./Components/pages/Home";
import CreateEstate from "./Components/pages/Estate/CreateEstate";
import SearchEstate from "./Components/pages/Estate/SearchEstate";
import EditEstate from "./Components/pages/Estate/EditEstate";
import CreatePersonnel from "./Components/pages/Personnel/CreatePersonnel";
import EditPersonnel from "./Components/pages/Personnel/EditPersonnel";
import SearchPersonnel from "./Components/pages/Personnel/SearchPersonnel";
import Settings from "./Components/pages/Settings";
import Logger from "./Components/pages/Logger";
import EstateDetails from "./Components/pages/Estate/EstateDetails";
import { ToastContainer } from "react-toastify";

import "swiper/css";
import "swiper/css/navigation";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-estate" element={<CreateEstate />} />
        <Route path="/search-estate" element={<SearchEstate />} />
        <Route path="/create-personnel" element={<CreatePersonnel />} />
        <Route
          path="/edit-personnel/:personnelId"
          element={<EditPersonnel />}
        />
        <Route path="/edit-estate/:stateId" element={<EditEstate />} />
        <Route path="/search-personnel" element={<SearchPersonnel />} />
        <Route path="/logger" element={<Logger />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/EstateDetails/:stateId" element={<EstateDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
