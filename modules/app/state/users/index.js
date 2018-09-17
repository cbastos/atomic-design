const DEFAULT = { list: [], selectedUser: null };

export const props = {
  users: {
    DEFAULT,
    REQUEST_GET_USERS: state => state,
    SET_USERS: (state, { users }) => ({
      ...state,
      list: users
    }),
    REQUEST_CREATE_USER: state => state,
    ADD_USER: (state, { user }) => ({
      ...state,
      list: [...state.list, user]
    }),
    REQUEST_DELETE_USER: state => state,
    DELETE_USER: ({ selectedUser, list }, action) =>
      ({ list: list.filter(e => e.id !== action.id), selectedUser })
  }
};
