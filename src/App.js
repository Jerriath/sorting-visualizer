// Importing node modules
import * as react from 'react';

//Importing other files from project
import Footer from './components/footer-component/Footer';
import Header from './components/header-component/Header';
import Visualizer from './components/visualizer-component/Visualizer';
import './App.css';

// Destructuring react functionalities
const {useState, useEffect} = react;


const App = () => {
	// Setting some states up 
	const [algorithm, setAlgorithm] = useState('insertion'); // Default to insertion because it's the simplest
	const [elements, setElements] = useState(5); // Sets the number of elements to sort; default to 5

	const onAlgorithmChange = (newAlgorithm) => {
		setAlgorithm(newAlgorithm);
	}

  return (
    <div className="App">
      <Header algorithm={algorithm} onAlgorithmChange={onAlgorithmChange} />
      <Visualizer elements={elements} />
      <Footer />
    </div>
  );
}

export default App;
