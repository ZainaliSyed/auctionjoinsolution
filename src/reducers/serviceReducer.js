//
//  serviceReducer.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:22:21 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import * as types from '../actions/ActionTypes';
import _ from 'lodash';
const initialState = {
  isFetching: false,
  failure: false,
  errMessage: '',
  data: [],
  meta: {},
};
export default (type) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case type.REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case type.SUCCESS:
        return {
          ...state,
          failure: false,
          isFetching: false,
          errorMessage: '',
          data: action.data.data,
          meta: action.data.meta,
        };
      case type.FAILURE:
        return {
          ...state,
          data: {},
          failure: true,
          isFetching: false,
          errorMessage: action.errorMessage,
        };

      default:
        return state;
    }
  };
};
