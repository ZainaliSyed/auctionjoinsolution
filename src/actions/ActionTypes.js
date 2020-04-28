//
//  ActionTypes.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:06:43 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL, CREATE, UPDATE, DELETE].forEach(
    (type) => {
      res[type] = `${base}_${type}`;
    },
  );
  return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = 'GENERAL_ACTION';
export const GENERAL_ACTION_MULTIPLE_REQUEST =
  'GENERAL_ACTION_MULTIPLE_REQUEST';
export const NO_INTERNET = 'NO_INTERNET';

//NETWORK DEFAULT ACTION
export const NETWORK_INFO = 'NETWORK_INFO';
//LOCATION ACTIONS

//APP GENERAL ACTIONS
export const LOGIN = createRequestTypes('LOGIN');
export const SIGNUP = createRequestTypes('SIGNUP');
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';
export const ADD_AUCTION = 'ADD_AUCTION';
export const SAVE_AUCTION = 'SAVE_AUCTION';

export const LOGOUT = 'LOGOUT';
