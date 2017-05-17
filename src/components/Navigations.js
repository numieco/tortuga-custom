import React from 'react'
import { FacebookButton, TwitterButton } from './SocialMediaButtons'
import { Link } from 'react-router-dom'

export default class Navigations extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      innerHeight: window.innerHeight
    }
  }

  componentDidMount() {
    this.listenResizeEvent()
    window.addEventListener('resize', this.listenResizeEvent)
  }

  listenResizeEvent = (event) => {
    this.setState({
      innerHeight: window.innerHeight
    })
  }

  render () {
    return (
      <div className='touch-device'>
        <div className={(this.props.device == undefined ? '' : this.props.device) +' navigation'}>
          <Link to={'/'}>
            <div className='home-nav'>
              Home
            </div>
          </Link>
          <Link to={'/page/about'}>
            <div className='about-nav'>
              About
            </div>
          </Link>
          <Link to={'/page/blog'}>
            <div className='blog-nav'>
              Blog
            </div>
          </Link> 
          <a target='_blank' href='https://storage.googleapis.com/ptg-assets/PPMPprogram.pdf'>
            <div className='metals-program-nav'>
              Metals Program
            </div>
          </a>
          <Link to={'/page/shop'}>        
            <div className='shop-nav'>
              Shop
            </div>
          </Link>
          <Link to={'/page/contact'}>
            <div className='contact-nav'>
              Contact
            </div>  
          </Link>
          {
            this.props.inside
            ? (
                <div className='float-right'>
                  <Link to={'#'}>
                    <div className='like-us-on-fb'> 
                      <div className='fb-image'>
                        <FacebookButton color="#405A94"/>
                      </div>
                      Like us on Facebook
                    </div>
                  </Link>
                  <Link to={'#'}>
                    <div className='follow-on-twitter'> 
                      <div className='twitter-image'>                
                        <TwitterButton />
                      </div>
                      Follow us on Twitter
                    </div>
                  </Link>
                </div>
              )
            : null
          }       
        </div>
        {
          !this.props.inside
          ? (
              <div className={this.props.device + ' social-contact'}>
                <div className='questions-call-us'>
                  Questions? Call us: 800-951-0592
                </div>
                <div className='wrap-fb-twitter'>
                  <div className='like-us-on-fb'> 
                    <div className='fb-image'>
                      <FacebookButton 
                        color={ this.state.innerHeight > 570 ? "#405A94" : "#FFFFFF" }
                        bgColor='##405a94'
                      />
                    </div>
                    {
                      this.state.innerHeight > 570
                      ? 'Like us on Facebook'
                      : null
                    }
                  </div>
                  <div className='follow-on-twitter'> 
                    <div className='twitter-image'>                
                      <TwitterButton color='#00a0ef' />
                    </div>
                    {
                      this.state.innerHeight > 570
                      ? 'Follow us on Twitter'
                      : null
                    }
                  </div>
                </div>   
              </div>    
            )
          : null
        }
      </div>
    )
  }
}