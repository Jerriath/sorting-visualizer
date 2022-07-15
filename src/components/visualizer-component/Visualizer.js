// Importing node modules
import React from 'react'
import { useState, useEffect } from 'react';

// Importing other project files
import './visualizer.css';

const Visualizer = ({elements, algorithm}) => {

  const [array, setArray] = useState([]);
  // Note: max height for an element should be 400px;

  useEffect( () => {
    let tempArray = [];
    for (let i = 0; i < elements; i++) {
      tempArray.push(Math.floor(400 * Math.random()))
    }
    setArray(tempArray);
  }, [elements])

  return (
    <div className='visualizer-root'>
      {array.map((height) => {return <div className='element' style={{height: height}}></div>})}
    </div>
  )
}

export default Visualizer