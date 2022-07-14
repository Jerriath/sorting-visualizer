// Importing node modules
import * as react from 'react';

//Importing styles
import './App.css';

// Destructuring react functionalities
const {useState, useEffect} = react;


function App() {

  return (
    <div className="App">
      <Nav />
      <Visualizer />
      <Footer />
    </div>
  );
}

export default App;
