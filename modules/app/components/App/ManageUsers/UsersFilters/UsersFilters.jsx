import React from 'react';
import './UsersFilters.scss';

export class UsersFilters extends React.Component {
  render() {
    return (
      <form className="users-filters">
        <h4 className="mb-2">Filtros</h4>
        <div className="field-wrapper">
          <label htmlFor="name">Nombre</label>
          <input className="users-filters__input" id="name" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="email">Email</label>
          <input className="users-filters__input" id="email" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="role">Rol</label>
          <select className="users-filters__select" id="role">
            <option>Rol 1</option>
          </select>
        </div>
        <div className="field-wrapper">
          <label htmlFor="registerDate">Fecha registro</label>
          <input
            className="users-filters__input"
            type="date"
            id="registerDate"
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="activo">Activo</label>
          <input type="checkbox" id="activo" />
        </div>
        <button type="submit" className="users-filters__button">
          Add user
        </button>
      </form>
    );
  }
}
