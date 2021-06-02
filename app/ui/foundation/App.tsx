import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'react-virtualized/styles.css';

import { Nav } from './components';
import './styles.scss';
import './i18n';

import { NotFound } from './pages';
import { Home, Playlists } from '../sections';

export function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Concat TV</title>
        <link rel="canonical" href="https://tv.conc.at/" />
      </Helmet>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/playlists" component={Playlists} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}
