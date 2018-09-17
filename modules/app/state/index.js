import * as users from './users';
import { getActionsFromStateActions, Actions } from './actions';
import { getReducersFromStateActions } from './reducers';

const state = {
    ...users.props
};

export const actions = getActionsFromStateActions(state);
export const reducers = getReducersFromStateActions(state);
export { sagas } from './sagas';
export { Store } from './store';
