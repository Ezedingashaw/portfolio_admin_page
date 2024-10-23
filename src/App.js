import { Fragment, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import AdminBar from './components/adminBar/adminBar';
import Admin from './components/adminPages/Admin';
import LoginPage from './components/loginPage/loginPage';

function App() {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    try {
      const user = jwtDecode(sessionStorage.getItem('token'));
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  },[]);

  return (
    <div className="appContainer">
      {user ?
      (<Fragment>
        <AdminBar />
        <Routes>
          <Route path='https://myportfolioadminpage.onrender.com/*' element={ <Admin />} />
        </Routes>
      </Fragment>):(<LoginPage/>)}
    </div>
  );
}

export default App;
