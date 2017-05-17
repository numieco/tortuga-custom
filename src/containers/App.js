import React from 'react'
import ListOfPosts from './ListOfPosts'
import Header from '../components/Header'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <ListOfPosts />
      </div>
    )
  }
}