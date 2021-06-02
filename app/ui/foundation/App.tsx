import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'react-virtualized/styles.css';

import { Nav } from './components/nav/Nav';
import './styles.scss';
import './i18n';
import { Home } from '../sections/home/Home';
import Playlists from 'sections/playlists/Playlists';
import { NotFound } from './pages';

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
          <Route exact path="/home">
            <Home />
          </Route>

          <Route path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/playlists">
            <Playlists />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
