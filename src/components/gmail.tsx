import * as React from 'react';  // tslint:disable-line
import { Button } from 'react-toolbox/lib/button';
import { Card, CardTitle } from 'react-toolbox/lib/card';

import { Component } from 'react';
import { auth, database } from 'firebase';


const img = {
  url: "https://www.gstatic.com/firebasejs/staging/3.0.0/auth/images/google.svg",
  style: {
    'width': '180px',
    'margin-bottom': '10px'
  }
};

const btn = {
  style: {
    'margin': 'auto',
    'height': '300px',
    'width': '300px',
    'padding': '20px'
  }
};

const center = { 'margin': 'auto' };
const title = "All good here, mate!";
const subtitle = "We've got we needed. You can close this page now.";


export class GmailAuth extends Component<{}, {}> {
  private login() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/gmail.readonly');

    auth().signInWithPopup(provider).then(data => {
      let gmail = data.credential as any;
      let user = database().ref(`users/${data.user.uid}`);

      user.update({ accessToken: gmail.accessToken });
    });
  }

  render() {
    const user = auth().currentUser;

    if (user) {
      return <Card><CardTitle style={center} title={title} subtitle={subtitle}/></Card>;
    }

    return (
      <Button style={btn.style} raised onClick={this.login}>
        <img style={img.style} src={img.url} /><br/>
        <div>Login with Google</div>
      </Button>
    );
  }
}
