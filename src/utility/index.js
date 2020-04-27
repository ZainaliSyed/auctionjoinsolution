//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:49:50 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {Alert, Platform} from 'react-native';
class utility {
  isPlatformAndroid = () => Platform.OS === 'android';
  isPlatformIOS = () => Platform.OS === 'ios';

  alerts = (title, description, onPress) => {
    Alert.alert(
      title,
      description,
      [
        {text: 'OK', onPress: onPress},
        {text: 'Cancel', onPress: () => {}},
      ],
      {
        cancelable: false,
      },
    );
  };
}

export default new utility();
