import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <div>
        <h2>Quiz</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Support</li>
            <li>Notification</li>
          </ul>
        </nav>
      </div>
      <button className="logout-button">Log Out</button>
    </div>
  );
}

export default Dashboard;


