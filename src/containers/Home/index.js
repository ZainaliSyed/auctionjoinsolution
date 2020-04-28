// @flow
import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {push} from '../../services/NavigationService';
import {Metrics} from '../../theme';
import {request, logout} from '../../actions/ServiceAction';
import {LOGIN, SIGNUP} from '../../actions/ActionTypes';
import constant from '../../constants';
import {AppButton} from '../../reuseableComponents';

class Home extends Component {
  state = {
    isLoaded: false,
  };
  componentDidMount() {}
  state = {isOn: false};

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: Metrics.doubleBaseMargin,
          }}>
          <Text> Welcome To Auction App</Text>
        </View>
        <AppButton title="Add Items" onPress={() => push('item')} />
        <AppButton
          title="Add Participant"
          onPress={() => push('participant')}
        />
      </SafeAreaView>
    );
  }
}
const actions = {
  request,
  logout,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, actions)(Home);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5FCFF'},
  top: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottom: {
    width: '100%',
    height: '100%',
    zIndex: 999,
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1
  },
});
