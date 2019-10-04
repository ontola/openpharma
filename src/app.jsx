import {
  LinkedResourceContainer,
  RenderStoreProvider,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import LRS from './LRS';

import FileSelector from './components/FileSelector'
import views from './views/index'

LRS.registerAll(views);

const App = () => {
  const Text = ({ location }) => {

    const resource = new URLSearchParams(location.search).get('resource');
    if(!resource) {
      return (
        <p
          className="TodoMessage"
          style={{
            fontStyle: 'italic',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          Enter a file or directory above and click open
        </p>
      );
    }

    LRS.getEntity(new NamedNode(resource), { reload: true })
    return (
      <LinkedResourceContainer subject={new NamedNode(resource)} />
    )
  }

  const pathname = new URL(FRONTEND_ROUTE).pathname;
  const maxWidth = '550px';

  return (
    <RenderStoreProvider value={LRS} >
      <BrowserRouter basename={pathname.endsWith('/') ? pathname.slice(0, -1) : pathname}>
        <div style={{
          background: 'black',
          text: 'center',
          background: '#c8f0ff',
          color: '#1b1b48',
        }}>
          <div style={{
              margin: 'auto',
              maxWidth,
              padding: '1rem',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
          }}>
            <h1 style={{
            }}>OpenPharma</h1>
            <a href="https://github.com/ontola/openpharma" style={{
              justifySelf: 'flex-end',
            }}>github</a>
          </div>
        </div>
        <div style={{
          margin: 'auto',
          maxWidth,
        }}>
          <FileSelector />
          <Switch>
            <Route key="resource" path="*" component={Text} />
          </Switch>
        </div>
      </BrowserRouter>
    </RenderStoreProvider>
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementsByClassName('app')[0]
);
