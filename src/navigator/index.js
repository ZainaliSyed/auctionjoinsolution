import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {dyanimcTitle} from './navigatorHelper';
import {Home, Items, Participant, Auction} from '../containers';
import {from} from 'rxjs';
import {createStackNavigator} from 'react-navigation-stack';

const HomeStack = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
    }),
  },
  item: {
    screen: Items,
    navigationOptions: ({navigation}) => ({
      title: 'Items',
    }),
  },
  participant: {
    screen: Participant,
    navigationOptions: ({navigation}) => ({
      title: 'Participant',
    }),
  },
  auction: {
    screen: Auction,
    navigationOptions: ({navigation}) => ({
      title: 'Auction',
    }),
  },
});

const rootNavigator = (isUserLoggedIn) =>
  createAppContainer(
    createSwitchNavigator(
      {
        HomeStack,
      },
      {
        initialRouteName: isUserLoggedIn ? 'HomeStack' : 'HomeStack',
      },
    ),
  );

export default rootNavigator;
