// Importing node modules
import React from 'react'

// Importing other project files
import './footer.css';


const Footer = () => {
  return (
    <footer className='footer'>
      <h1>
        Created By: <span className='github' ></span><a href='https://github.com/Jerriath' target='_blank' >Jerriath</a>
      </h1>
      <h1>
        Check out the Repo <a className='repo' href='https://github.com/Jerriath' target='_blank' >here</a>
      </h1>
    </footer>
  )
}

export default Footer