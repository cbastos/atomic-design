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
    setTimeout(() => {
      actions.SET_USERS({
        users: [
          { id: 1, name: 'Petter', email: 'petter@gmail.com', rol: 'Admin', createdAt: '12 June 2019', active: true },
          { id: 2, name: 'Arthur', email: 'arthur@gmail.com', rol: 'Team member', createdAt: '15 June 2019', active: true },
          { id: 3, name: 'Jack', email: 'jack@gmail.com', rol: 'Team member', createdAt: '30 June 2017', active: false },
          { id: 4, name: 'Simon', email: 'simon@gmail.com', rol: 'Team member', createdAt: '11 June 2014', active: true },
          { id: 5, name: 'Robert', email: 'robert@gmail.com', rol: 'Team lead', createdAt: '04 June 2009', active: true }
        ]
      });
    }, 10);
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
