import { Store } from './store';

/**
 * This function retrieves an object with a set of method as properties that can launch
 * every action found in each property of the centralized state.Is a helper to laun actions
 * in redux store.
 * @return {Object} actions dictionary helper.
 * @example
 * getActionsFromStateActions({
 *      state_propery_one: {
 *          ACTION_1: (state, action) => { ... },
 *          ACTION_2: (state, action) => { ... }
 *      },
 *      other_state_property:{
 *          ACTION_1: (state, action) => { ... },
 *          ACTION_3: (state, action) => { ... }
 *      }
 * });
 *
 * Generates:
 * {
 *    ACTION_1(){ ... },
 *    ACTION_2(){ ... },
 *    ACTION_3(){ ... }
 * }
 */
export function getActionsFromStateActions(stateActions) {
  const actionsNames = getActionNamesFrom(stateActions);
  return getActionsOf(actionsNames);
}

function getActionNamesFrom(stateActions) {
  let actionsNames = [];
  Object.keys(stateActions).forEach((r) => {
    actionsNames = [...actionsNames, ...Object.keys(stateActions[r])];
  });
  return actionsNames.filter((value, i, self) => self.indexOf(value) === i);
}

function getActionsOf(actionsNames) {
  const actions = { store: null };
  actionsNames.forEach((name) => {
    actions[name] = payload => actions.store().dispatch(Object.assign({ type: name }, payload));
    actions[name].toString = () => name;
  });
  return actions;
}
