/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, take } from 'redux-saga/effects';
import { LOAD_LOGIN, LOAD_NOTES, LOAD_CREATE } from './constants';
import {
  sucessLogin,
  errorLogin,
  sucessNotes,
  errorNotes,
  sucessCreate,
  errorCreate,
} from './actions';
import { getObjectBody } from '../../utils/getDataDeviceConnection';
import endpoint from '../../utils/api/endpoints';
import Cookies from 'universal-cookie';
import request from 'utils/request';
import { selectHomeState } from './selectors';

/**
 * Login
 */
export function* checkLogin(action) {
  var { ip, fingerprint, refreshToken } = action.login;
  if (ip && fingerprint && refreshToken) {
    const requestUrl = endpoint.getall;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip: ip, fingerprint: fingerprint, refreshToken }),
    };
    try {
      const repos = yield call(request, requestUrl, options);
      yield put(sucessLogin(repos));
    } catch (err) {
      console.log('Error catch', err);
      yield put(errorLogin(err));
    }
  } else {
    const cookies = new Cookies();
    const dataCookie =
      cookies == undefined ? false : yield cookies.get('saveUserInfo');
    const objectPrepared = yield getObjectBody({});
    const dataAuth = dataCookie ? dataCookie : objectPrepared;
    const { ip, fingerprint, token } = dataAuth;
    const requestUrl = endpoint.getall;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip: ip, fingerprint: fingerprint, token: token }),
    };
    try {
      const repos = yield call(request, requestUrl, options);
      yield put(sucessLogin(repos));
    } catch (err) {
      console.log('Error catch', err);
      yield put(errorLogin(err));
    }
  }
}

/*
 * Create note
 */
export function* createNote(action) {
  var text = action.text;
  console.log('Testing tezt ', action);
  const cookies = new Cookies();
  const dataCookie = yield cookies.get('saveUserInfo');
  const { ip, fingerprint, token } = dataCookie;
  const requestUrl = endpoint.create;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ip, fingerprint, token, text }),
  };
  try {
    const repos = yield call(request, requestUrl, options);
    console.log('Lo que llega al crear la nota ', repos);
    yield put(sucessCreate(repos.body));
  } catch (err) {
    console.log('Error catch', err);
    yield put(errorCreate(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* handleGetNotes() {
  yield takeLatest(LOAD_LOGIN, checkLogin);
  yield takeLatest(LOAD_CREATE, createNote);
}
