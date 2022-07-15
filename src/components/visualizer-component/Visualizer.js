// Importing node modules
import React from 'react'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

// Importing other project files
import './visualizer.css';
import insertionSort from './insertionSort';
import bubbleSort from './bubbleSort';
import Element from '../element-component/Element';

const Visualizer = ({algorithm, array, sorting, stopSort}) => {

  const [elementsArray, setElementsArray] = useState([]);

  useEffect(() => {
    setElementsArray(array.map((height) => {return <Element classList='element' key={uuid()} height={height} />}))
  }, [array])

  useEffect(() => {
    if (sorting === true) {
      bubbleSort(elementsArray, stopSort, setElementsArray);
    }
  }, [sorting])

  // Eventually will prob change this to map to an Element component
  return (
    <div className='visualizer-root'>
      {elementsArray}
    </div>
  )
}

export default Visualizer