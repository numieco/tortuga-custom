import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import SinglePost from '../components/SinglePost'
import SinglePostArticle from '../components/SinglePostArticle'

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

export default class ArchivePosts extends React.Component {
  
  constructor (props) {
    super (props)

    this.state = {
      posts: [],
      populatePosts: [],
      postWithoutLink: [],
      archiveMonth: props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]
    }

    this.sortPostsofThisMonth = this.sortPostsofThisMonth.bind(this)

  }

  componentWillMount (props) {
    window.scrollTo(0, 0)
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/all')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if(xhr.status === 200) {
        this.setState({
          posts: xhr.response.posts
        }, () => {
          this.sortPostsofThisMonth(this.state.archiveMonth)
        })
      }
    })
    xhr.send()
  }

  componentWillReceiveProps (nextProps, nextState) {
    window.scrollTo(0, 0)
    this.setState({
      archiveMonth: nextProps.location.pathname.split('/')[nextProps.location.pathname.split('/').length - 1]
    }, () => this.sortPostsofThisMonth(this.state.archiveMonth))
  }

  sortPostsofThisMonth (monthYYYY) {

    let postWithoutLink = []
    let populatePosts = this.state.posts.map((post, i) => {

      let postDateObject = new Date(post.published_at)
      let archiveURLMonth = months.indexOf(monthYYYY.substr(0, monthYYYY.length - 4))
      let archiveURLYear = parseInt(monthYYYY.substr(-4))
      
      if((post.meta_description === null) && (postWithoutLink.length < 3)) {
        postWithoutLink.push(<SinglePostArticle post={ post } key={ i } />)
      }
      if((postDateObject.getMonth() === archiveURLMonth)
        && (postDateObject.getFullYear() === archiveURLYear)) {

        if(post.meta_description === null || post.meta_description === '') {
          return (<SinglePost featured={ false } archiveWithoutLink={ true } post={ post } key={ i } />)
        }
        else {
          return (<SinglePost featured={ false } post={ post } key={ i } />)
        }
        
      }
    })

    this.setState({ populatePosts: populatePosts, postWithoutLink })    
  }

  render () {
    return (
      <div className='archive-post'>
        <Header />        
        
        <div className='wrapper'>
          <div className='container archive-post-container'>
            <div className='normal-posts'>
              { this.state.populatePosts }
            </div>
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