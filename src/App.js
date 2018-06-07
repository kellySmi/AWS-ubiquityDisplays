import './css/styles.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import {Container, Label, Form, Input, Search, Sidebar, Segment, Button, Menu, Image, Icon, Grid, Message } from 'semantic-ui-react'
import Header from "./components/common/header";
import HomePage from "./components/home/homePage";
//import Authenticator from './Authenticator';

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <HomePage />
      </Container>

    );
  }
}
export default withAuthenticator(App, { includeGreetings: true });
