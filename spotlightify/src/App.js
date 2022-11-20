import React, {useEffect} from 'react'

function App() {

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then(data => console.log(data))
  }, [0])
  return (
    <div className="App">
      <h1>Spotlightify</h1>
    </div>
  );
}

export default App;
