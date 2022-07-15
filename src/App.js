// Importing node modules
import * as react from 'react';

//Importing other project files
import Footer from './components/footer-component/Footer';
import Header from './components/header-component/Header';
import Visualizer from './components/visualizer-component/Visualizer';
import './App.css';

// Destructuring react functionalities
const {useState, useEffect} = react;


const App = () => {
	// Setting some states up; All states are stored here and the values and onChange handlers are passed to children
	const [algorithm, setAlgorithm] = useState('insertion'); // Default to insertion because it's the simplest
	const [elements, setElements] = useState(4); // Sets the number of elements to sort; default to 4

	const onAlgorithmChange = (newAlgorithm) => {
		setAlgorithm(newAlgorithm);
	}

  const onElementsChange = (newElements) => {
    setElements(newElements);
  }

  return (
    <div className="App">
      <Header 
        algorithm={algorithm} 
        onAlgorithmChange={onAlgorithmChange} 
        elements={elements} 
        onElementsChange={onElementsChange} />
      <Visualizer 
        elements={elements}
        algorithm={algorithm} />
      <Footer />
    </div>
  );
}

export default App;
