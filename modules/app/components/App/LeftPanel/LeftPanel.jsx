import React from 'react';
import { Menu } from './Menu/Menu';

import './LeftPanel.scss';

export class LeftPanel extends React.Component {
  render() {
    return (
      <aside className="left-panel">
        <img
          alt="Atomic design logo"
          className="left-panel__logo"
          src="https://www.phase2technology.com/sites/default/files/inline-images/icon-atom.png"
        />
        <Menu />
      </aside>
    );
  }
}
