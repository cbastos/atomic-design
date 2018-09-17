/**
 * The store is a wrapper over redux store that centralizes the dependency
 * with the library and adds some functionality
*/
export class Store {
  store;
  stateActionsHandlers;

  /**
   * Constructor
   * @param {Object} store - redux store that wraps
  */
  constructor(store) {
      this.store = store;
      this.stateActionsHandlers = [];
  }

  /**
   * Wraps the subscribe function and adds the posibility to listen changes only for
   * one property of the entire state.
   * @param {string|function} state - property name of the state that you want to
   * listen for a change. If has a fuction value is similiar than every (*) change listen.
   * @param {function|undefined} callback - define a callback function that must be called
   * in case of state property change.
   * @return {Subscription} subscription.
  */
  subscribe(state, callback) {
      let finalCallback = callback;
      let finalState = state;
      if (typeof state === 'function') {
          finalCallback = state;
          finalState = '*';
      }
      return this.store.subscribe(() => {
          const specificState = finalState === '*' ? this.store.getState() : this.store.getState()[finalState];
          finalCallback(specificState);
      });
  }

  /**
   * Wraps the dispatch method of redux store. Allow to dispatch actions that can
   * derive in state changes through reducers.
   * @param {object} action - property name of the state that you want to
   * @param {object} action.type - type of action that you want to dispatch
   * @return {void}
  */
  dispatch(action) {
      this.store.dispatch(action);
  }

  /**
   * Wraps the getState method of redux store. Allow to get the curren state.
   * @return {Object} the current redux store state.
  */
  getState() {
      return this.store.getState();
  }
}
