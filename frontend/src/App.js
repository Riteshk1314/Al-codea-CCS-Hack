import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import StudentPage from './components/StudentPage';
import axios from 'axios';

class App extends React.Component {
  state = {
    details: [],
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/proctor/reactview/')
      .then(res => {
        this.setState({
          details: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { details } = this.state;
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage details={details} />} />
          <Route path="/student" element={<StudentPage details={details} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
