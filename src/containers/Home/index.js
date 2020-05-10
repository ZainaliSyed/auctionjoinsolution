// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {push} from '../../services/NavigationService';
import {Metrics} from '../../theme';
import {request, logout} from '../../actions/ServiceAction';

import {AppButton} from '../../reuseableComponents';

class Home extends Component {
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
});
