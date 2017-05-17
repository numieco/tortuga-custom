import React from 'react'
import Logo from './Logo'

const Loading = () => (
  <div className='loading'>
    <div className='wrap-loading'>
      <Logo />
      <div className='loading-text'> LOADING... </div> 
    </div>
  </div>
)

export default Loading