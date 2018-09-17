import { connect } from 'connector';
import { SomeComponent } from './SomeComponent';

export default connect(SomeComponent, ({ users: { list } }, actions) => ({
    users: list,
    requestUsers() { actions.REQUEST_GET_USERS(); },
    add(user) { actions.REQUEST_CREATE_USER({ user }); },
    delete(user) { actions.REQUEST_DELETE_USER({ user }); }
}));
