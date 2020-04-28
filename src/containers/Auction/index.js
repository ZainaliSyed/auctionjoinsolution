import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, Text, FlatList, View, StyleSheet} from 'react-native';
import {pop} from '../../services/NavigationService';
import {dispatchGeneralSaveAction} from '../../dispatchActions';

import {
  TextField,
  AppButton,
  ButtonView,
  FormHandler,
} from '../../reuseableComponents';
import {
  ADD_PARTICIPANT,
  ADD_AUCTION,
  SAVE_AUCTION,
} from '../../actions/ActionTypes';
import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';
import utility from '../../utility';
import ModalDropdown from 'react-native-modal-dropdown';
import {DropDownView, AuctionRow} from '../../components';

class Auction extends Component {
  formHandlerRef = (ref) => (this.formHandler = ref);
  constructor(props) {
    super(props);
    this.state = {
      participant: {},
      bidValue: 0,
    };
  }
  componentDidMount() {}
  _renderItem = ({item, index}) => {
    return <AuctionRow data={item} />;
  };

  _onItemPress = () => {
    const {auctionReducer, navigation} = this.props;
    const {bidValue, participant} = this.state;

    const startValue = +navigation.state.params.itemData.price;
    const payload = {
      itemId: navigation.state.params.itemData.id,
      startingPrice: +navigation.state.params.itemData.price,
      bidderName: participant.category_name,
      bidAmount: +bidValue,
      profit: +bidValue - startValue,
      id: utility.randomNumberId(),
    };

    dispatchGeneralSaveAction(ADD_AUCTION, payload);
  };

  _onPressSaveAcution = () => {
    const {auctionReducer, navigation} = this.props;
    const item = navigation.state.params.itemData;
    dispatchGeneralSaveAction(SAVE_AUCTION, item);
    setTimeout(() => {
      alert('Result : ' + this.props.auctionReducer.saveAuction);
    }, 100);
  };

  _renderResult = () => {
    return (
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <Text style={styles.heading}>Auction Winner </Text>
        <Text style={styles.heading}>
          {' '}
          {this.props.auctionReducer.saveAuction}{' '}
        </Text>
      </View>
    );
  };

  _renderAuctionHeader = () => {
    return (
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.headingTitle}>Starting Price</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.headingTitle}>Bidder</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.headingTitle}>Bid</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.headingTitle}>Profit</Text>
        </View>
      </View>
    );
  };
  render() {
    const {auctionReducer, navigation} = this.props;
    const item = navigation.state.params.itemData;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{justifyContent: 'center', padding: 10, alignSelf: 'center'}}>
          <Text style={styles.heading}>
            Item :{navigation.state.params.itemData.itemName}{' '}
            {navigation.state.params.itemData.price}
            {' USD '}
          </Text>
        </View>

        <DropDownView
          placeholderTextinput={'Select Participant Item'}
          type={INPUT_TYPES.OPTIONAL}
          options={auctionReducer.participant}
          identifier="state_id"
          id={'id'}
          selectedCB={(data) => {
            this.setState({participant: data});
          }}
        />
        <TextField
          placeholderTextinput={'Enter Bid'}
          error="Insert bid "
          blurOnSubmit
          type={INPUT_TYPES.NUMBER}
          changeText={(value) => {
            this.setState({bidValue: value});
          }}
        />

        <AppButton
          title="ADD Auction"
          onPress={() => {
            this._onItemPress();
          }}
          style={{marginTop: 10}}
        />
        {this._renderAuctionHeader()}
        <FlatList
          data={
            auctionReducer.addAuction[item.id] &&
            auctionReducer.addAuction[item.id].length
              ? auctionReducer.addAuction[item.id]
              : []
          }
          renderItem={this._renderItem}
        />

        {auctionReducer.addAuction[item.id] &&
        auctionReducer.addAuction[item.id].length ? (
          <AppButton
            title="Auction Result"
            onPress={this._onPressSaveAcution}
          />
        ) : null}
      </SafeAreaView>
    );
  }
}
const actions = {};
const mapStateToProps = (state) => ({
  auctionReducer: state.auctionReducer,
});

export default connect(mapStateToProps, actions)(Auction);

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  subTitle: {
    fontSize: 10,
    fontWeight: 'normal',
    fontFamily: 'Cochin',
  },
});
