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
import { ApolloProvider } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Playlists } from 'sections';

import { Nav } from './components';
import { client } from './client';

import './styles.scss';
import './i18n';

export function App() {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </ApolloProvider>
  );
}