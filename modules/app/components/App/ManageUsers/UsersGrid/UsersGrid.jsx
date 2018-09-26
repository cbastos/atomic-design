import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

export class UsersGrid extends React.Component {
  render() {
    return (
      <Grid style={{ height: '410px' }} data={this.props.users}>
        <Column field="id" title="ID" width="40px" />
        <Column field="name" title="Usuario" width="40px" />
        <Column field="email" title="Email" width="250px" />
        <Column field="rol" title="Rol" width="40px" />
        <Column field="createdAt" title="Fecha creación" width="120px" />
        <Column field="active" title="Activo" width="40px" />
      </Grid>
    );
  }
}
