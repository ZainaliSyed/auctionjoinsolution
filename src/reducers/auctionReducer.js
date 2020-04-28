import * as types from '../actions/ActionTypes';
import _ from 'lodash';
const initialState = {
  isFetching: false,
  failure: false,
  errMessage: '',
  items: [],
  participant: [],
  addAuction: {},
  saveAuction: '',
};

export default (state: Object = initialState, action: Object) => {
  console.log(action.type, 'action.type');
  switch (action.type) {
    case types.ADD_ITEM:
      const tempData = _.cloneDeep(state.items);
      tempData.unshift(action.data);
      return {
        ...state,
        items: tempData,
      };
    case types.ADD_PARTICIPANT:
      const tempPartipantData = _.cloneDeep(state.participant);
      tempPartipantData.unshift(action.data);
      return {
        ...state,
        participant: tempPartipantData,
      };

    case types.ADD_AUCTION:
      let tempAddAuctionData = _.cloneDeep(state.addAuction);
      const itemId = action.data.itemId;
      var b = action.data;
      tempAddAuctionData[itemId]
        ? tempAddAuctionData[itemId].push(b)
        : (tempAddAuctionData[itemId] = [b]);

      return {
        ...state,
        addAuction: tempAddAuctionData,
      };

    case types.SAVE_AUCTION:
      const tempSaveAuctionData = _.cloneDeep(state.addAuction);
      const itemIdSearch = action.data.id;
      const bidAmount = Math.max(
        ...tempSaveAuctionData[itemIdSearch].map((s) => s.bidAmount),
      );

      return {
        ...state,
        saveAuction: bidAmount,
      };

    default:
      return state;
  }
};
