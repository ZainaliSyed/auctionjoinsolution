import {generalSaveAction} from '../actions/ServiceAction';
import {store, persistor} from '../store';
import _ from 'lodash';

const dispatchGeneralSaveAction = (type, data, isConcat) => {
  store.dispatch(generalSaveAction(type, data, isConcat));
};

export {dispatchGeneralSaveAction};
