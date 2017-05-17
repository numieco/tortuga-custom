import React from 'react'

import Logo from './../components/Logo'
import Loading from './../components/Loading'
import SinglePost from '../components/SinglePost'
import SinglePostArticle from '../components/SinglePostArticle'
import SideBar from './../components/SideBar'
import Footer from './../components/Footer'

import SoundCloud from './../Svg/SoundCloud'
import QuestionMarkLogo from './../Svg/QuestionMarkLogo'
import MicrophoneLogo from './../Svg/MicrophoneLogo'
import ArrowSVG from './../Svg/ArrowSVG'
import { FacebookButton, TwitterButton } from '../components/SocialMediaButtons'

const ghostSecret = require('../ghost-secret')

let posts = null
const MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ]

export default class ListOfPosts extends React.Component {
  
  constructor (props) {
    super (props)
    this.state = {
      posts: [],
      featuredPost: null,
      featuredTime: null,
      postWithLinkNumber: 12,
      postWithLink: [],
      postWithoutLink: [],
      tempArchiveTime: [],
      innerWidth: window.innerWidth,
      isLoaded: false
    }

    this.loadMorePostHandle = this.loadMorePostHandle.bind(this)
  }

  componentWillMount (props) {

    const xhr = new XMLHttpRequest()
    xhr.open('get', '/all')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {

      if(xhr.status === 200) {
        this.setState({
          posts: xhr.response.posts
        }, () => {

          let featuredTime = 0
          let featuredPost
          let tempArchiveTime = []
          let month = 0
          let year = 0
          let MonthYYYY = null

          this.state.posts.reverse().map((post, i) => {
            if(i === 0){
              featuredTime = post.published_at
              this.setState({
                featuredTime: post.published_at
              })
            }

            if (post.featured === true) {
              if(featuredTime < post.published_at){
                featuredTime = post.published_at
              }
            }
            
          })

          let postWithLink = []
          let postWithoutLink = []

          this.state.posts.reverse().map((post, i) => {
            if (post.published_at === featuredTime){
              this.setState({
                featuredPost: <SinglePost featured={ true } className='checking' post={ post } key={ i } />
              })
            }
            else {
              if(post.meta_description === null || post.meta_description === '') {
                if(postWithoutLink.length < 3)
                  postWithoutLink.push(<SinglePostArticle post={ post } key={ i } />)
              }
              else {
                if(postWithLink.length < this.state.postWithLinkNumber)
                  postWithLink.push(<SinglePost featured={ false } className='checking' post={ post } key={ i } />)
              }
            }
          })

          this.setState({
            featuredTime: featuredTime,
            postWithLink: postWithLink,
            postWithoutLink: postWithoutLink,
            isLoaded: true
          })
        })
      }
    })
    xhr.send()      
  }

  componentDidMount() {
    this.listenResizeEvent()
    window.addEventListener('resize', this.listenResizeEvent)
  }

  listenResizeEvent = (event) => {
    this.setState({
      innerWidth: window.innerWidth
    })
  }  

  loadMorePostHandle = () => {
    this.setState({
      postWithLinkNumber : this.state.postWithLinkNumber + 10
    }, () => {

      let postWithLink = []
      posts = this.state.posts.map((post, i) => {
        if((post.meta_description !== null) && (post.published_at !== this.state.featuredTime)) {
          if(postWithLink.length < this.state.postWithLinkNumber)
            postWithLink.push(<SinglePost featured={ false } className='checking' post={ post } key={ i } />)
        }
      })

      this.setState({
        postWithLink: postWithLink
      })
    })
  }

  render () {

    return (
      <div>
      {
        this.state.isLoaded
        ? null
        : <Loading />
      }
      <div className='wrapper'>
        <div className='container'> 
          <div>{this.state.featuredPost}</div>
          <div className='relevant-news'>
            relevant news
          </div>
          <div className='normal-posts' >
            { this.state.postWithLink }
          </div>
          <div className='load-more-post' onClick={ this.loadMorePostHandle }>
            load more posts
          </div>

          {
            this.state.innerWidth <= 902
            ? (
                <div>
                  <SideBar
                    postWithoutLink = {this.state.postWithoutLink}
                    posts = { this.state.posts }
                  />
                  <Footer />
                </div>
              )
            : null
          }
        </div>

        {
          this.state.innerWidth > 902
          ? (
              <div className='sidebar-container'>
                <SideBar
                  postWithoutLink = { this.state.postWithoutLink }
                  posts = { this.state.posts }
                />
              </div>
            )
          : null
        }
      </div>
        {
          this.state.innerWidth > 902
          ? <Footer />
          : null
        }
      </div>
    )
  }
}