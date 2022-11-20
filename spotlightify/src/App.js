import React, {useEffect} from 'react'
import Welcome from './pages/Welcome';

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
