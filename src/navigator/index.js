//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {dyanimcTitle} from './navigatorHelper';
import {Home, Demo} from '../containers';
import {from} from 'rxjs';
import {createStackNavigator} from 'react-navigation-stack';

const HomeStack = createStackNavigator({
  home: {
    screen: Home,
  },
  demo: {
    screen: Demo,
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
