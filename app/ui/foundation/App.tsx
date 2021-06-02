import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'react-virtualized/styles.css';

import { Nav } from './components';
import './styles.scss';
import './i18n';

import { Home, Playlists, NotFound } from 'sections';

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
          <Route path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/playlists">
            <Playlists />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
