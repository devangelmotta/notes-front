/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  loadLogin: true,
  sucessLogin: false,
  errorLogin: false,
  payloadLogin: false,
  loadNotes: false,
  sucessNotes: false,
  errorNotes: false,
  loadCreate: false,
  sucessCreate: false,
  errorCreate: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_LOGIN:
        draft.loadLogin = true;
        draft.sucessLogin = false;
        draft.payloadLogin = action.login;
        break;
      case SUCESS_LOGIN:
        draft.loadLogin = false;
        draft.sucessLogin = action.data;
        break;
      case ERROR_LOGIN:
        draft.loadLogin = false;
        draft.sucessLogin = false;
        draft.errorLogin = action.error;
        break;
      case LOAD_NOTES:
        draft.loadNotes = true;
      case SUCESS_NOTES:
        draft.loadNotes = false;
        draft.sucessNotes = action.notes;
        break;
      case ERROR_NOTES:
        draft.loadNotes = false;
        draft.sucessNotes = false;
        draft.errorLogin = action.error;
        break;

      case LOAD_CREATE:
        draft.loadCreate = true;
      case SUCESS_CREATE:
        draft.loadCreate = false;
        draft.sucessCreate = action.note;
        break;
      case ERROR_CREATE:
        draft.loadCreate = false;
        draft.sucessCreate = false;
        draft.errorCreate = action.error;
        break;
    }
  });

export default homePageReducer;
