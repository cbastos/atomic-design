import { takeEvery, call } from 'redux-saga/effects';
// import WebApi from '../api';
import { actions } from '..';

function* requestUsers() {
  yield takeEvery(actions.REQUEST_GET_USERS.toString(), loadUsers);
}
function* loadUsers() {
  // const webApi = new WebApi();
  yield call(() => {
    // webApi.Users_GetUserList().then(users => {
    actions.SET_USERS({ users: [] });
    // });
  });
}

function* addUser() {
  yield takeEvery(actions.REQUEST_CREATE_USER.toString(), createUser);
}
function* createUser({ user }) {
  // const webApi = new WebApi();
  yield call(() => {
    // webApi.Users_CreateUser(user).then(user => {
    actions.ADD_USER({ user });
    // });
  });
}

function* deleteUser() {
  yield takeEvery(actions.REQUEST_DELETE_USER.toString(), removeUser);
}

function* removeUser({ user }) {
  // const webApi = new WebApi();
  yield call(() => {
    // webApi.Users_DeleteUser(id).then(() => {
    actions.DELETE_USER({ id: user.id });
    // });
  });
}

export const usersSagas = [requestUsers, addUser, deleteUser];
