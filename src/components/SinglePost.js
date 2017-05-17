import React from 'react'
import { Link } from 'react-router-dom'

import LinkToReferece from '../Svg/LinkToReferece'
const ghostSecret = require('../ghost-secret')

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

export default class SinglePost extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      post: this.props.post
    }

    this.getFormattedDate = this.getFormattedDate.bind(this)
  }

  getFormattedDate = (fullDate) => {
    let convertThisDate = fullDate.slice(0, 10)
    let date = new Date(convertThisDate)
    return ("Posted " + months[date.getMonth()] + " " + date.getDate() + "th, " + date.getFullYear())
  }

  render () {
    return (
      <div className={ this.props.featured ? 'featured' : 'single-post' }>
        {
          this.props.post.image !== null
          ? (
              <div className={ this.props.featured ? 'featured-hero-image' : 'normal-hero-image'}>
                <img src={ghostSecret.domain + this.props.post.image} />
              </div>
            )
          : null
        }
        {
          (!this.props.featured && !this.props.archiveWithoutLink)
          ? (
              <div className='link-svg'>
                <LinkToReferece />
              </div>
            )
          : null
        }
        <div className={ this.props.post.image === null ? 'post no-image' : 'post' }>
          {
            this.props.archiveWithoutLink
            ? (
                <div className='title'>
                  <Link to={ '/post/' + this.props.post.slug }>
                    {this.props.post.title}
                  </Link>
                </div>
              )
            : (
                <div className={this.props.featured ? 'featured-title' : 'title'}>
                  {
                    (this.props.post.meta_description === null || this.props.post.meta_description === '')
                    ? (
                        <Link to={ '/post/' + this.props.post.slug }>
                          {this.props.post.title}
                        </Link>
                      )
                    : <a target='_blank' href={ this.props.post.meta_description } > {this.props.post.title} </a>
                  }
                </div>
              )
          }

          <div className='post-published-at'>
            { this.getFormattedDate(this.props.post.published_at) }
          </div>
          <div className='post-content-preview'
            dangerouslySetInnerHTML={{__html: this.props.post.html}}
          >
          </div>
          {
            this.props.featured
            ? ( 
                (this.props.post.meta_description === null || this.props.post.meta_description === '')
                ? (
                    <Link to={ '/post/' + this.props.post.slug }>
                      <div className='continue-reading'>
                        continue reading
                      </div>
                    </Link>
                  )
                : (
                    <a target='_blank' href={ this.props.post.meta_description }>
                      <div className='continue-reading'>
                        continue reading
                      </div>
                    </a>
                  )
              )
            : null
          }
        </div>
      </div>
    )
  }
}