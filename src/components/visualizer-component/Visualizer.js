// Importing node modules
import React from 'react'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

// Importing other project files
import './visualizer.css';
import bubbleSort from './sorting-functions/bubbleSort';
import insertionSort from './sorting-functions/insertionSort';
import mergeSort from './sorting-functions/mergeSort';
import quickSort from './sorting-functions/quickSort';
import selectionSort from './sorting-functions/selectionSort';
import Element from '../element-component/Element';

const Visualizer = ({algorithm, array, speed, sorting, stopSort}) => {

  const [elementsArray, setElementsArray] = useState([]);

  useEffect(() => {
    setElementsArray(array.map((height) => {return <Element classList='element' key={uuid()} height={height} />}))
  }, [array])

  useEffect(() => {
    if (sorting === true) {
      switch(algorithm) {
        case 'insertion':
          insertionSort(elementsArray, stopSort, setElementsArray, speed);
          stopSort();
          break;
        case 'selection':
          selectionSort();
          stopSort();
          break;
        case 'bubble':
          bubbleSort(elementsArray, stopSort, setElementsArray, speed);
          break;
        case 'merge':
          mergeSort();
          stopSort();
          break;
        case 'quick':
          quickSort();
          stopSort();
          break;
      }
      
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