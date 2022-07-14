import React from 'react'
import { useEffect } from 'react';

import './header.css'

const Header = ({algorithm, onAlgorithmChange, elements, onElementsChange}) => {

  const onSelection = (e) => {
    onAlgorithmChange(e.target.value);
  }

  const onRangeChange = (e) => {
    onElementsChange(e.target.value);
  }

  return (
    <header>
			<div>
				<h2 className='clickable' >
          Randomize Order
        </h2>
			</div>
			<div className='range-div'>
        <h2>
          Change number of elements
        </h2>
        <input onChange={onRangeChange} value={elements} type='range' min='4' max='100' />
			</div>
			<div className='algorithm-select' >
        <button onClick={onSelection} value='insertion' className={algorithm === 'insertion' ? 'selected clickable' : 'clickable'} >
          Insertion Sort
        </button>
        <button onClick={onSelection} value='selection' className={algorithm === 'selection' ? 'selected clickable' : 'clickable'} >
          Selection Sort
        </button>
        <button onClick={onSelection} value='bubble' className={algorithm === 'bubble' ? 'selected clickable' : 'clickable'} >
          Bubble Sort
        </button>
        <button onClick={onSelection} value='merge' className={algorithm === 'merge' ? 'selected clickable' : 'clickable'} >
          Merge Sort
        </button>
        <button onClick={onSelection} value='quick' className={algorithm === 'quick' ? 'selected clickable' : 'clickable'} >
          Quick Sort
        </button>
			</div>
			<div>
        <h2 className='clickable' >
          SORT!
        </h2>
			</div>
    </header>
  )
}

export default Header