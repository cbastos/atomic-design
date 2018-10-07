import React from 'react';
import './UsersFilters.scss';
export class UsersFilters extends React.Component {
  render() {
    return (
      <form className="users-filters">
        <h4 className="mb-2">Filtros</h4>
        <div className="field-wrapper">
          <label htmlFor="name">Nombre</label>
          <input id="name" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="email">Email</label>
          <input id="email" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="role">Email</label>
          <select>
            <option>Rol 1</option>
          </select>
        </div>
        <div className="field-wrapper">
          <label htmlFor="role">Fecha registro</label>
          <input type="date" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="role">
            Activo
            <input type="checkbox" />
          </label>
        </div>
        <button className="">Add user</button>
      </form>
    );
  }
}
