import * as React from 'react';  // tslint:disable-line
import { render as renderDOM } from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { GmailAuth } from './components/gmail';
import { app } from './firebase';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


function render() {
  const content = document.getElementById('content');
  const style = {
    'margin': 'auto',
    'text-align': 'center',
    'padding-top': '200px',
    'width': '600px'
  };

  renderDOM(
    <div style={style}><GmailAuth/></div>,
    content
  );
}

const auth = app.auth();
auth.signOut();
auth.onAuthStateChanged(render);
