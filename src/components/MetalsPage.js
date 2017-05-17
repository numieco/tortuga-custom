import React from 'react'

import Header from '../components/Header'
import SideBar from './../components/SideBar'
import Footer from './../components/Footer'
import SinglePostArticle from '../components/SinglePostArticle'

const ghostSecret = require('../ghost-secret')
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

export default class MetalsPage extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      posts: [],
      heroImage: '',
      title: '',
      published_at: '',
      html: '',
      postWithoutLink: []
    }
    this.getFormattedDate = this.getFormattedDate.bind(this)

  }

  getFormattedDate = (fullDate) => {
    let convertThisDate = fullDate.slice(0, 10)
    let date = new Date(convertThisDate)
    return ("Posted " + months[date.getMonth() + 1] + " " + date.getDate() + "th, " + date.getFullYear())
  }

  componentWillMount () {

    const xhr = new XMLHttpRequest()
    xhr.open('get', '/slug' + this.props.location.pathname.slice(5))
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if(xhr.status === 200) {
        let postWithoutLink = []

        xhr.response.posts.map((post, i) => {
          if(post.slug === (this.props.location.pathname.slice(6))) {
            this.setState({
              heroImage: post.image,
              title: post.title,
              published_at: post.published_at,
              html: post.html
            })
          } else if ((postWithoutLink.length < 3) && (post.meta_description === null)) {
            postWithoutLink.push( <SinglePostArticle post={ post } key={ i } /> )
          }
        })

        this.setState({ postWithoutLink, posts: xhr.response.posts })
      }
    })
    xhr.send({})
  }

  componentWillReceiveProps (nextProps, nextState) {
    this.state.posts.map((post, i) => {
      if(post.slug === nextProps.location.pathname.slice(6)){
        this.setState({
          heroImage: post.image,
          title: post.title,
          published_at: post.published_at,
          html: post.html
        })
      }
      
    })
  }

  render () {
    return (
      <div className='individual-page'>
        <Header />        
        
        <div className='wrapper'>
          <div className='container'>
            
          </div>
          <div className='sidebar-container'>
            <SideBar
              postWithoutLink = { this.state.postWithoutLink }
              posts = { this.state.posts }
            />
          </div>          
        </div>  

        <Footer />          
      </div>
    )
  }
}