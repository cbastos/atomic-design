import React from 'react';
import { LeftPanel } from 'components';
import { ManageUsers } from 'components';
import './App.scss';

export class App extends React.Component {
  componentDidCatch() {}
  render() {
    return (
      <div className="l-app">
        <LeftPanel />
        <main className="l-app__main">
          <ManageUsers />
        </main>
      </div>
    );
  }
}
