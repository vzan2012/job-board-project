import { useState, Suspense, lazy } from "react";

import { Route, Routes, useNavigate } from "react-router";
import { getUser } from "./lib/auth";
import { RoutesMap } from "./routes/RoutesMap";
import Loader from "./components/loader/Loader";

// Lazy Load
const LazyNavBar = lazy(() => import("./components/NavBar"));

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
      <Suspense fallback={<Loader />}>
        <LazyNavBar user={user} onLogout={handleLogout} />
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
      </Suspense>
    </>
  );
};

export default App;
