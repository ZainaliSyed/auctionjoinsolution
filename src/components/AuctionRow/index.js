import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Metrics, Colors, Images, AppStyles} from '../../theme';
import {ButtonView} from '../../reuseableComponents';

const AuctionRow = (props) => {
  return (
    <ButtonView style={styles.renderItemContainer} onPress={() => {}}>
      <View style={{flex: 1}}>
        <Text style={styles.subTitle}>{props.data.id}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.subTitle}>{props.data.bidderName}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.subTitle}>{props.data.bidAmount} USD</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.subTitle}>{props.data.profit} USD</Text>
      </View>
    </ButtonView>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
  },
});

export default AuctionRow;
