import { useState } from "react";

import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import { getUser } from "./lib/auth";
import Navbar from "./components/NavBar";
import { RoutesMap } from "./routes/RoutesMap";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser);

  const handleLogin = (user) => {
    setUser(user);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="section">
        <Routes>
          {RoutesMap({ requestLoginHandler: handleLogin }).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              exact={route.index}
            />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default App;
