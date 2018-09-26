import React from 'react';
import { LeftPanel } from 'components';
import { ManageUsers } from 'components';

export class App extends React.Component {
  componentDidCatch() {

  }
  render() {
    return (
      <div>
        <LeftPanel></LeftPanel>
        <ManageUsers></ManageUsers>
      </div >
    );
  }
}
