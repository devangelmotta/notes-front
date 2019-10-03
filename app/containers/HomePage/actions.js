/*
 *
 * HomePage actions
 *
 */

import {
  LOAD_LOGIN,
  SUCESS_LOGIN,
  ERROR_LOGIN,
  LOAD_NOTES,
  SUCESS_NOTES,
  ERROR_NOTES,
  LOAD_CREATE,
  SUCESS_CREATE,
  ERROR_CREATE,
} from './constants';

/*
 *
 * Type action and payload login
 *
 */

export function loadLogin(login) {
  return {
    type: LOAD_LOGIN,
    login,
  };
}

export function sucessLogin(data) {
  return {
    type: SUCESS_LOGIN,
    data,
  };
}

export function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error,
  };
}

/*
 *
 * Type action and payload get notes
 *
 */

export function loadNotes(text) {
  return {
    type: LOAD_NOTES,
  };
}

export function sucessNotes(notes) {
  return {
    type: SUCESS_NOTES,
    notes,
  };
}

export function errorNotes(error) {
  return {
    type: ERROR_NOTES,
    error,
  };
}

/*
 *
 * Type action create note
 *
 */

export function loadCreate(text) {
  return {
    type: LOAD_CREATE,
    text,
  };
}

export function sucessCreate(note) {
  return {
    type: SUCESS_CREATE,
    note,
  };
}

export function errorCreate(error) {
  return {
    type: ERROR_CREATE,
    error,
  };
}
