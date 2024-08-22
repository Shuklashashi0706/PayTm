import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      {/* Protect the Dashboard route */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* Protect the Send route */}
      <Route
        path="/send/:id"
        element={
          <PrivateRoute>
            <Send />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
