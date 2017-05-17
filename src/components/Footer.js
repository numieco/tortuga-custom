import React from 'react'
import Logo from './../components/Logo'
import { FacebookButton, TwitterButton } from '../components/SocialMediaButtons'
import { Link } from 'react-router-dom'

const Footer = (props) => (
  <div>
    <div className='footer'>
      <div className='site-logo'>
        <Logo />
      </div>
      
      <div className='footer-social-media-buttons'>
        <div className='footer-button'>
          <Link to={'#'}>
            <FacebookButton color="#1c1e22" />
          </Link>
        </div>
        <div className='footer-button'>
          <Link to={'#'}>
            <TwitterButton />
          </Link>
        </div>
      </div>
      
      <Link to={'#'}>
        <div className='footer-text-link'>
          US Dollar / USDX Index
        </div>
      </Link>
      <Link to={'#'}>
        <div className='footer-text-link'>
          DJIA
        </div>
      </Link>
      <Link to={'#'}>
        <div className='footer-text-link'>
          Gold IRA
        </div>
      </Link>
      <Link to={'#'}>
        <div className='footer-text-link'>
          Links
        </div>
      </Link>
      <div className='clear-both'>
        <Link to={'#'}>
          <div className='privacy-policy'>
            Privacy Policy
          </div>
        </Link>
        <Link to={'#'}>
          <div className='terms-conditions'>
            Terms & Conditions
          </div>
        </Link>   
      </div>            
    </div>
    <div className='footer-copyright'>
      Copyright 2017 
      <a className='footer-copyright-bold'> Patriot Trading Group</a>
      . All rights reserved. 
    </div>
  </div>
)

export default Footer