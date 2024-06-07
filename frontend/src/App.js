import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import StudentPage from './components/StudentPage';
import CameraFeed from "./components/CameraFeed";
// import StudentPage from "./components/testing";

class App extends React.Component {
  state = {
    details: [],
  };

  render() {
    const { details } = this.state;
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/camera" element={<CameraFeed />} />
          {/* <Route path="/testing" element={<StudentPage />} /> */}
        </Routes>
      </Router>
    );
  }
}

export default App;
