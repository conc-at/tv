import React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../foundation/client';

import { App } from '../foundation';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div');
  el.setAttribute('id', 'root');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.body.appendChild(el),
  );
});
