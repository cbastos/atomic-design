import React from 'react';
import './Menu.scss';

export class Menu extends React.Component {
  render() {
    return (
      <ul className="ad-menu">
        <li className="ad-menu__item"><a>Usuarios</a></li>
        <li className="ad-menu__item"><a>Roles</a></li>
        <li className="ad-menu__item"><a>Configuración</a></li>
      </ul>
    );
  }
}
