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
  const [speed, setSpeed] = useState(1500);
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);

  useEffect( () => {
    let tempArray = [];
    for (let i = 0; i < elements; i++) {
      tempArray.push(Math.floor(400 * Math.random()))
    }
    setArray(tempArray);
  }, [elements])

	const onAlgorithmChange = (newAlgorithm) => {
		setAlgorithm(newAlgorithm);
	}

  const onElementsChange = (newElements) => {
    setElements(newElements);
  }

  const onSpeedChange = (newSpeed) => {
    setSpeed(500 - newSpeed);
  }

  const onRandomize = () => {
    let temp = [...array];
    temp.sort((a, b) => 0.5 - Math.random())
    setArray(temp);
  }

  const onSort = () => {
    if (sorting !== true) {
      setSorting(true);
    }
  }

  const stopSort = () => {
    setSorting(false);
  }

  return (
    <div className="App">
      <Header 
        algorithm={algorithm} 
        onAlgorithmChange={onAlgorithmChange} 
        elements={elements} 
        onElementsChange={onElementsChange}
        speed={speed}
        onSpeedChange={onSpeedChange}
        onRandomize={onRandomize}
        onSort={onSort}
        sorting={sorting} />
      <Visualizer 
        algorithm={algorithm}
        array={array}
        speed={speed}
        sorting={sorting}
        stopSort={stopSort} />
      <Footer />
    </div>
  );
}

export default App;
