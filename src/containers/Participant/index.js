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
import {ADD_PARTICIPANT} from '../../actions/ActionTypes';
import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';
import utility from '../../utility';

class Participant extends Component {
  formHandlerRef = (ref) => (this.formHandler = ref);
  constructor(props) {
    super(props);
    this.state = {
      participantName: '',
    };
  }
  componentDidMount() {}
  _renderItem = ({item, index}) => {
    return (
      <ButtonView style={styles.renderItemContainer} onPress={() => {}}>
        <View style={{flex: 1}}>
          <Text style={styles.subTitle}>{item.id}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.subTitle}>{item.category_name}</Text>
        </View>
      </ButtonView>
    );
  };

  _onItemPress = () => {
    const {participantName} = this.state;
    const payload = {
      category_name: participantName,
      id: utility.randomNumberId(),
    };
    dispatchGeneralSaveAction(ADD_PARTICIPANT, payload);
  };
  render() {
    const {auctionReducer} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <FormHandler ref={(ref) => (this.formHandler = ref)}>
          <TextField
            placeholderTextinput={'Participant Name'}
            error="Insert participant name"
            blurOnSubmit
            type={INPUT_TYPES.TEXT}
            changeText={(value) => {
              this.setState({participantName: value});
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
            <Text style={styles.headingTitle}>ID</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.headingTitle}>Participant Name</Text>
          </View>
        </View>
        <FlatList
          data={auctionReducer.participant}
          renderItem={this._renderItem}
        />
      </SafeAreaView>
    );
  }
}
const actions = {};
const mapStateToProps = (state) => ({
  auctionReducer: state.auctionReducer,
});

export default connect(mapStateToProps, actions)(Participant);

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
