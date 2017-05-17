import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './styles/index.sass';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './containers/App'
import IndividualArticlePage from './containers/IndividualArticlePage'
import ArchivePosts from './containers/ArchivePosts'
import AboutPage from './components/AboutPage'
import BlogPage from './components/BlogPage'
import MetalsPage from './components/MetalsPage'
import ShopPage from './components/ShopPage'
import ContactPage from './components/ContactPage'

render(
  <Router>
    <div>
      <Route exact path='/' component={ App } />
      <Route path='/post/' component={ IndividualArticlePage } />
      <Route path='/page/about' component={ AboutPage } />
      <Route path='/page/blog' component={ BlogPage } />
      <Route path='/page/metals-program' component={ MetalsPage } />
      <Route path='/page/shop' component={ ShopPage } />
      <Route path='/page/contact' component={ ContactPage } />
      <Route path='/archive/' component={ ArchivePosts } />
    </div>
  </Router>
  , document.getElementById('app')
)
