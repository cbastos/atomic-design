import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { UsersGrid, UsersFilters } from 'components';

export class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: props.users, name: '' };
  }

  componentDidMount() {
    this.props.requestUsers();
  }

  componentWillReceiveProps({ users }) {
    this.setState({ ...this.state, users });
  }

  render() {
    const { className } = this.props;
    return (
      <Fragment>
        <h1>Usuarios</h1>
        <UsersFilters />
        <UsersGrid users={this.state.users} />
      </Fragment>
    );
  }
}

ManageUsers.defaultProps = {
  users: []
};

ManageUsers.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired
    })
  )
};
