import React from 'react';
import { Menu } from './Menu/Menu';

export class LeftPanel extends React.Component {
  render() {
    return (
      <div>
        <img className="logo" src="https://www.phase2technology.com/sites/default/files/inline-images/icon-atom.png"/>
        <Menu></Menu>
      </div>
    );
  }
}
