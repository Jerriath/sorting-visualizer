// Importing node modules
import React from 'react'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

// Importing other project files
import './visualizer.css';

const Visualizer = ({algorithm, array}) => {

  // Eventually will prob change this to map to an Element component
  return (
    <div className='visualizer-root'>
      {array.map((height) => {return <div key={uuid()} className='element' style={{height: height}}></div>})}
    </div>
  )
}

export default Visualizer