import React from 'react'
import ArrowSVG from './../Svg/ArrowSVG'
import { Link } from 'react-router-dom'

export default class SinglePostArticle extends React.Component {

  constructor (props) {
    super (props)

    this.redirectUsingSlug = this.redirectUsingSlug.bind(this)
  }

redirectUsingSlug = () => {
  window.location = '/post'
}

  render () {
    return (
      <Link to={ '/post/' + this.props.post.slug }>
      <div className='more-articals-element'>
          { this.props.post.title }
          <div className='arrow-svg'>
            <ArrowSVG />
          </div>
      </div>
      </Link>
    )
  }
}