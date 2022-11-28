import React, {useEffect} from 'react'
import Welcome from './pages/Welcome';
import UserHome from './pages/UserHome';
import './styles/app.scss';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
function App() {
 fetch('/Spotify/authorizeSpotify')
      .then(response => response.json())
      .then(data => window.location.assign(data))
  // useEffect(() => {
  //   fetch('/Spotify/authorizeSpotify')
  //     .then(response => response.json())
  //     .then(data => window.location.assign(data))
  // }, [0])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />                      
          <Route path='/userhome' element={<UserHome />} />                      
        </Routes>
      </Router>
    
      
    </div>
  );
}

export default App;
