// Importing node modules
import React from 'react'

const Element = ({height, classList}) => {



  return (
    <div className={classList} style={{height: height}}></div>
  )
}

export default Element