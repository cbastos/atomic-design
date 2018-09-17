
const typeClonators = [
    {
        for: Date,
        copy(date) {
            const copy = new Date();
            copy.setTime(date.getTime());
            return copy;
        },
    },
    {
        for: Array,
        copy(array) {
            const copy = [];
            for (let i = 0, len = array.length; i < len; i++) {
                copy[i] = clone(array[i]);
            }
            return copy;
        }
    },
    {
        for: Object,
        copy(obj) {
            const copy = {};
            Object.keys(obj).forEach((attr) => {
                /* eslint no-prototype-builtins: "off" */
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = clone(obj[attr]);
                }
            });
            return copy;
        }
    }
];

/**
 * Does a deep clone of an object of any type.
 * @param {*} obj - object of any type.
 * @return {*} a copy of the object.
 */
function clone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const clonator = typeClonators.find(c => obj instanceof c.for);
    if (clonator) {
        return clonator.copy(obj);
    }
    throw new Error('Unable to copy obj! Its type isn\'t supported.');
}

/**
 * This function retrieves the redux reducers format from the stateActions format.
 * @return {Object} reducers.
 * @example
 * getReducersFromStateActions({
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
 * Generates something like:
 *
 * {
 *    state_propery_one(state, action){
 *      switch(action.type){
 *          case 'ACTION_1': ...
 *          case 'ACTION_2': ...
 *      }
 *    },
 *    other_state_property(state, action){
 *      switch(action.type){
 *          case 'ACTION_1': ...
 *          case 'ACTION_3': ...
 *      }
 *    },
 * }
 */
export function getReducersFromStateActions(stateActions) {
    const actionsPerReducers = {};
    Object.keys(stateActions).forEach((p) => {
        const actionReducer = stateActions[p];
        actionsPerReducers[p] = (state, action) => {
            const reducerAction = actionReducer[action.type];
            if (reducerAction) {
                return getReducerResult(reducerAction, clone(state), clone(action));
            } else if (state === undefined && 'DEFAULT' in actionReducer) {
                return getReducerResult(actionReducer.DEFAULT, clone(state), clone(action));
            }
            return state;
        };
    });
    return actionsPerReducers;
}

function getReducerResult(reducerAction, state, action) {
    if (typeof reducerAction === 'function') {
        return reducerAction(state, action);
    }
    return reducerAction;
}

