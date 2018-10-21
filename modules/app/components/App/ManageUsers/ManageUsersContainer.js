import { connect } from 'connector';
import { ManageUsers } from './ManageUsers';

export default connect(ManageUsers, ({ users: { list } }, actions) => {
  return {
    users: list,
    requestUsers() { actions.REQUEST_GET_USERS(); },
    add(user) { actions.REQUEST_CREATE_USER({ user }); },
    delete(user) { actions.REQUEST_DELETE_USER({ user }); }
  };
});
