import React, {useEffect} from 'react'
import Welcome from './pages/Welcome';
import './styles/app.scss';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then(data => console.log(data))
  }, [0])
  return (
    <div className="App">
      <Welcome />
    </div>
  );
}

export default App;
