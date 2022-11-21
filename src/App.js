import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet
} from "react-router-dom";
import "./index.css";
import Login from './Login';
import Home from './Home';




const GuestLayout = () => {
  return (
    <div>
      <h1></h1>
      <Outlet />
    </div>
  );
};

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Optional index route if no nested routes match */}
        <Route index element={<div>Default Page Content</div>} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <div className="App">
       {/* <Link to="/login">Go to login</Link> */}
        <AppRoute />
      </div>
    </Router>
  );
}
