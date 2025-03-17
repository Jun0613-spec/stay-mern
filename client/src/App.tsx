import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/layout";
import Home from "./components/pages/home";
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Settings from "./components/pages/settings";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<>Search Page</>} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
