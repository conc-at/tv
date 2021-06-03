import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'react-virtualized/styles.css';

import { Playlists } from 'sections';

import { Nav } from './components';
import './styles.scss';
import './i18n';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

export function App() {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Concat TV</title>
        <link rel="canonical" href="https://tv.conc.at/" />
      </Helmet>
      <Router>
        <Nav />
        <Switch>
          <Redirect from="/" to="/playlists" exact />
          <Route path="/playlists" component={Playlists} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
