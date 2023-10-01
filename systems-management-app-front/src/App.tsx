import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import { Routes, useNavigate, Route, Navigate } from 'react-router-dom';
import SystemSearch from './Pages/SystemSearch';
import SystemUpdate from './Pages/SystemUpdate';
import SystemCreate from './Pages/SystemCreate';

function App() {
  // const navigate = useNavigate();
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <Button
  //         color="danger"
  //         onClick={() => {
  //           navigate('/system-search');
  //         }}
  //       >
  //         Hello, world!
  //       </Button>
  //     </header>
  //   </div>
  // );
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to={'/system-search'} />} />
        <Route path="/system-update" element={<SystemUpdate />} />
        <Route path="/system-create" element={<SystemCreate />} />
        <Route path="*" element={<SystemSearch />} />
      </Routes>
    </React.Fragment>
  )
}

export default App;
