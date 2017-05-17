import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Logo from './Logo'
import Navigations from './Navigations'

export default class Header extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      menuButtonIsActive: false,
      innerWidth: window.innerWidth,
      isTablet: false,
      isMobile: false
    }
  }

  componentDidMount() {
    this.listenResizeEvent()
    window.addEventListener('resize', this.listenResizeEvent)
  }

  listenResizeEvent = (event) => {
    this.setState({
      innerWidth: window.innerWidth
    }, () => {
      if (this.state.innerWidth <= 415)
        this.setState({ isTablet: false, isMobile: true })
      else if ((this.state.innerWidth > 415) && (this.state.innerWidth <= 902))
        this.setState({ isTablet: true, isMobile: false })
      else
        this.setState({ 
          menuButtonIsActive: false,
          isTablet: false,
          isMobile: false
        }, () => {
          document.getElementsByTagName("body")[0].style.overflow = 'scroll'
        })
    })
  }

  render () {
    return (
      <div> 
        <div className='header'> 
          <div className='wrapper'>
          <div className='logo'>
            <Link to='/' >
              <Logo />
            </Link>
          </div>

          {
            this.state.innerWidth > 902
            ? <Navigations inside={true}/>
            : (
                <div 
                  className='menu-button' 
                  onClick={
                    () => this.setState({
                      menuButtonIsActive: !this.state.menuButtonIsActive
                    }, () => {
                      if(this.state.menuButtonIsActive)
                        document.getElementsByTagName("body")[0].style.overflow = 'hidden'
                      else
                        document.getElementsByTagName("body")[0].style.overflow = 'scroll'
                    })
                  }
                >
                  <button 
                    type="button"
                    className={
                      this.state.menuButtonIsActive
                      ? "hamburger hamburger--slider js-hamburger is-active"
                      : "hamburger hamburger--slider js-hamburger" 
                    }
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner"></span>
                    </span>
                  </button>
                </div>
              )
          }

        </div> 

        {
          this.state.menuButtonIsActive
          ? <div > <Navigations device={this.state.isTablet ? 'tablet-menus' : 'mobile-menus'} inside={false}/> </div>
          : null
        }
        </div>
      </div>
    )
  }
}