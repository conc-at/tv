import React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from '../foundation';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div');
  el.setAttribute('id', 'root');
  ReactDOM.render(<App />, document.body.appendChild(el));
});
