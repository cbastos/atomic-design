import React from 'react';

export class UsersFilters extends React.Component {
  render() {
    return (
      <fieldset>
        <legend>Filtros</legend>
        <label htmlFor="name">
          Nombre
            <input id="name"  />
        </label>
        <label htmlFor="email">
          Email
            <input id="email" />
        </label>
        <label htmlFor="role">
          Email
            <select>
            <option>Rol 1</option>
          </select>
        </label>
        <label htmlFor="role">
          Fecha registro
            <input type="date" />
        </label>
        <label htmlFor="role">
          Activo
          <input type="check" />
        </label>
        <button className="btn btn-primary">
          Add user
        </button>
      </fieldset >
    );
  }
}
