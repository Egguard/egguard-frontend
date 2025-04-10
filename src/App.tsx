import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import User from "./pages/User";
import "./styles/App.css";
import MainLayout from "./Layouts/MainLayout";
import { routes } from "./routes/routes";
import UnderConstruction from "./pages/UnderConstruction";

function App() {
  const location = useLocation();

  return (
    <div className="w-screen h-dvh">
      <Routes location={location} key={location.pathname}>
        <Route
          path={routes.LANDING}
          element={
            <MainLayout>
              <Landing />
            </MainLayout>
          }
        />
        <Route
          path={routes.USER}
          element={
            <MainLayout user>
              <User></User>
            </MainLayout>
          }
        />
        <Route
          path={routes.UNDER_CONSTRUCTION}
          element={
            <MainLayout>
              <UnderConstruction />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
