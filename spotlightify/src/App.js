import React, {useEffect} from 'react'
import Welcome from './pages/Welcome';
import UserHome from './pages/UserHome';
import Loading from './pages/Loading';
import './styles/app.scss';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />                      
          <Route path='/userhome' element={<UserHome />} />    
          <Route path ='/loading' element={<Loading />} />
        </Routes>
      </Router>
    
      
    </div>
  );
}

export default App;
