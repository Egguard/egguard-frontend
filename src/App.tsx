import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import "./styles/App.css";
import MainLayout from "./Layouts/MainLayout";

function App() {
  const location = useLocation();

  return (
    <div className="w-screen h-dvh">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <MainLayout>
              <Landing />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
