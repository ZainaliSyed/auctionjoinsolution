import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, Text, FlatList, View, StyleSheet} from 'react-native';
import {pop, push} from '../../services/NavigationService';
import {dispatchGeneralSaveAction} from '../../dispatchActions';

import {
  TextField,
  AppButton,
  ButtonView,
  FormHandler,
} from '../../reuseableComponents';
import {ADD_ITEM} from '../../actions/ActionTypes';
import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';
import utility from '../../utility';

class Demo extends Component {
  formHandlerRef = (ref) => (this.formHandler = ref);
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      price: '',
    };
  }
  componentDidMount() {}
  _renderItem = ({item, index}) => {
    return (
      <ButtonView
        style={styles.renderItemContainer}
        onPress={() => {
          push('auction', {itemData: item});
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.subTitle}>{item.itemName}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.subTitle}>{item.price}</Text>
        </View>
      </ButtonView>
    );
  };

  _onItemPress = () => {
    const {itemName, price} = this.state;
    const payload = {
      itemName,
      id: utility.randomNumberId(),
      price,
    };
    dispatchGeneralSaveAction(ADD_ITEM, payload);
  };
  render() {
    const {auctionReducer} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <FormHandler ref={(ref) => (this.formHandler = ref)}>
          <TextField
            placeholderTextinput={'Item Name'}
            error="Insert Item Name"
            blurOnSubmit
            type={INPUT_TYPES.TEXT}
            changeText={(value) => {
              this.setState({itemName: value});
            }}
          />
          <TextField
            placeholderTextinput={'Price'}
            error="Insert Price"
            blurOnSubmit
            type={INPUT_TYPES.TEXT}
            changeText={(value) => {
              this.setState({price: value});
            }}
          />
        </FormHandler>
        <AppButton
          title="Save"
          onPress={() => {
            this._onItemPress();
          }}
          style={{marginTop: 10}}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.headingTitle}>Item Name</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.headingTitle}>Price</Text>
          </View>
        </View>
        <FlatList data={auctionReducer.items} renderItem={this._renderItem} />
      </SafeAreaView>
    );
  }
}
const actions = {};
const mapStateToProps = (state) => ({
  auctionReducer: state.auctionReducer,
});

export default connect(mapStateToProps, actions)(Demo);

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  subTitle: {
    fontSize: 10,
    fontWeight: 'normal',
    fontFamily: 'Cochin',
  },
  renderItemContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
  },
});
