import React from 'react'
import LoaderIcon from './Loader.svg'
import './Loader.style.css'

const Loader = () => {
  return (
    <div className="loader-container">
        <img className="logo" src={LoaderIcon} alt="logo" />
        <div className="loader1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
  )
}

export default Loader