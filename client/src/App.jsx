import "./App.css";

// components
// import Login from "./components/Login";
// import About from "./components/About";
// import Dashboard from "./components/Dashboard";
import SignedInUser from "./components/SignedInUser";

import LandingPage from "./components/LandingPage/LandingPage";
import FlightsDashboard from "./components/FlightsDashboard/FlightsDashboard";
import CosmonautsDashboard from "./components/AstronautsDashboard/AstronautsDashboard";
import RocketsDashboard from "./components/RocketsDashboard/RocketsDashboard";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="in" element={<SignedInUser />}>
        <Route path="flights/*" element={<FlightsDashboard />} />
        <Route path="astronauts" element={<CosmonautsDashboard />} />
        <Route path="rockets" element={<RocketsDashboard />} />
      </Route>
    </Routes>
  );
  // return <CreateNewFlight />;
}

export default App;

// {
/* <div className="container">
<p>-----</p>
<p>Houston about what it is</p>
<p>link to Houston login page there</p>
<p>-----</p>
<p>or</p>
<p>Houston dashboard for the logged-in user</p>
</div> */
// }

// {
/* <p>-----</p>
<p>Houston about what it is</p>
<p>link to Houston login page there</p>
<p>-----</p>
<p>or</p>
<p>Houston dashboard for the logged-in user</p>

<Router>
  header always showing
  <div>
    <Link to="/about">about hero</Link>
    <br />
    <Link to="/login">login</Link>
    <br />
    <Link to="/dashboard">dashboard</Link>
  </div>

  switching pages
  <Routes>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
  </Routes>

  footer always showing was there any
</Router> */
// }
