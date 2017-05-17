import React from 'react'
import SoundCloud from './../Svg/SoundCloud'
import QuestionMarkLogo from './../Svg/QuestionMarkLogo'
import MicrophoneLogo from './../Svg/MicrophoneLogo'
import ArrowSVG from './../Svg/ArrowSVG'
import { Link } from 'react-router-dom'

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

export default class SideBar extends React.Component {
  constructor (props) {
    super (props)
  
    this.state = {
      isArchiveTrue: false,
      archiveMonthsElement: [],
      windowInnerWidth: window.innerWidth,
      saleScrollHeight: 0,
      saleStyleClass: 'shop-gold'
    }

    this.handleArchiveClick = this.handleArchiveClick.bind(this)
    this.calculateMonths = this.calculateMonths.bind(this)
  }

  componentWillMount () {
    this.calculateMonths(this.props.posts)
    window.addEventListener('resize', (event) => {
      this.setState({
        windowInnerWidth: window.innerWidth
      })
    })
  }

  componentDidMount () {
    if(document.getElementsByClassName('sidebar-container')[0] != undefined){
      window.addEventListener('scroll', (event) => {
       this.setState({
          saleScrollHeight: document.getElementsByClassName('sidebar-container')[0].getBoundingClientRect().bottom
        }, () => {
          let saleDiv = document.getElementById('sale')
          let saleDivHeight = saleDiv.getBoundingClientRect().bottom - saleDiv.getBoundingClientRect().top + 20 + 20
   
          if (this.state.saleStyleClass == 'shop-gold') {
            if((this.state.saleScrollHeight - saleDivHeight) <= 0) {
              this.setState({
                saleStyleClass: 'shop-gold position-top-right'
              })
            } else {
              this.setState({
                saleStyleClass: 'shop-gold'
              })
            }
          } else {
            if(this.state.saleScrollHeight <= 0) {
              this.setState({
                saleStyleClass: 'shop-gold position-top-right'
              })
            } else {
              this.setState({
                saleStyleClass: 'shop-gold'
              })
            }
          }
        }) 
      })
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    this.calculateMonths(nextProps.posts)
  }

  calculateMonths = (posts) => {
    let archiveMonths = []

    let archiveMonthsElement = posts.map((post, i) => {
      const date = new Date(post.published_at)
      
      if(archiveMonths.indexOf(months[date.getMonth()] + ' ' + date.getFullYear()) == -1) {
        archiveMonths.push(months[date.getMonth()] + ' ' + date.getFullYear())
        return (
          <Link to={ '/archive/' + months[date.getMonth()] + date.getFullYear() }>
            <div className='archive-month-name' > 
              { months[date.getMonth()] + ' ' + date.getFullYear() } 
            </div>
          </Link>
        )
      }
    })

    this.setState({ archiveMonthsElement: archiveMonthsElement })
  }

  handleArchiveClick = () => {
    this.setState({ isArchiveTrue: !this.state.isArchiveTrue })
  }

  render () {
    return (
      <div>
        <div className='call-us'>
          <div className='contact-number'>
            Questions? Call us: <a className='telephone' href='tel:800-951-0592'>800-951-0592</a>
          </div>
          <div className='address'>
            Patriot Trading Group
            2010 W. Parkside Lane
            Suite 154 <br/>
            Phoenix, AZ 85027
          </div>
        </div>

        {
          this.state.windowInnerWidth <= 902
          ? (
              <div id='sale' className='shop-gold'>
                <img alt='Shop Gold !' src='https://all-american-gold.ghost.io/content/images/2017/05/Data-Image.jpg'></img>
                <div className='shop-gold-text'>
                  $1 Gold Coin Sale! Shop Now!
                </div>
              </div>
            )
          : null
        }

        <div className='links-container'>
          <div className='links-title'>
            Links
          </div>
          <Link to={'#'} >
            <div className='links-element links-element-sound-cloud'>
              <div className='sound-cloud-logo'>
                <SoundCloud />
              </div>
                SoundCloud Podcasts
              <div className='arrow-svg'>
                <ArrowSVG />
              </div>
            </div>
          </Link>
          <Link to={'#'} >
            <div className='links-element links-element-question'>
              <div className='question-logo'>
                <QuestionMarkLogo />
              </div>
              
                Frequently Asked Questions
              
              <div className='arrow-svg'>
                <ArrowSVG />
              </div>
            </div>
          </Link>
          <Link to={'#'} >
            <div className='links-element links-element-radio'>
              <div className='radio-logo'>
                <MicrophoneLogo />
              </div>
              
                LIVE Radio Show
              
              <div className='arrow-svg'>
                <ArrowSVG />
              </div>
            </div>            
          </Link>
        </div>

        <div className='more-articals-container'>
          <div className='more-articals-title'>
            More Articles
          </div>
          { this.props.postWithoutLink }
        </div>

        <div className='archive-button' onClick={ this.handleArchiveClick }>
          <div className='archive-button-text'>
            Archives
          </div>
          <div className={ this.state.isArchiveTrue ? 'arrow-svg rotate-svg' : 'arrow-svg' } >
            <ArrowSVG />
          </div>
        </div>
        {
          this.state.isArchiveTrue
          ? ( 
              <div className='archive-months'>
              {
                this.state.archiveMonthsElement
              }
              </div>
            )
          : null
        }

        {
          this.state.windowInnerWidth > 902
          ? (
              <div id='sale' className={ this.state.saleStyleClass }>
                <img alt='Shop Gold !' src='https://all-american-gold.ghost.io/content/images/2017/05/Data-Image.jpg'></img>
                <div className='shop-gold-text'>
                  $1 Gold Coin Sale! Shop Now!
                </div>
              </div>
            )
          : null
        }

      </div>  
    )
  }
}
