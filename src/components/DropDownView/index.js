//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import _ from 'lodash';
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, AppStyles, Metrics, Images} from '../../theme';
import utility from '../../utility';
import ModalDropdown from 'react-native-modal-dropdown';

import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';

const whitePlaceholder = Colors.text.white,
  transparentWhitePlaceholder = Colors.text.white,
  slateGreyPlaceholder = Colors.text.slateGrey;

let dropDownText = {};

let showOptions = [];

export default class DropdownView extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onRightPress: PropTypes.func,
    rightIcon: PropTypes.any,
    rightText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isEmpty: PropTypes.bool,
    labelBackgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    outlined: PropTypes.bool,
    textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
  };

  static defaultProps = {
    label: 'placeholder',
    error: 'Error',
    onRightPress: () => {},
    rightIcon: Images.downBlackarrow,
    rightText: '',
    value: '',
    activeTextColor: 'red',
    activeTextColor: Colors.text.white,
    inactiveColor: Colors.text.darkBlueGrey,
    activeColor: Colors.text.redText,
    outlined: false,
    textInputStyle: {},
    style: {},
    onFocus: () => {},
    returnKeyType: 'default',
    onSubmitEditing: () => {},
    editPhoneNumberForm: false,
    selectedCB: () => {},
    id: undefined,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isFocused: false,
      error: props.error,
      val: props.value ? props.value : '',
      maxHeight: 0,
      minHeight: 52,
      expanded: false,
      isError: false,
      isValidNumber: false,
      cca2: 'US',
      countryCode: '+1',
    };
  }

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
  }

  //   setText = txt => {
  //     this.onChangeText(txt);
  //   };

  setError = (val, error = this.state.error) => {
    this.setState({isError: val, error});
  };

  setFocus = () => {
    this.textInput.focus();
  };

  handleFocus = () => {
    this.props.onFocus();
  };
  handleBlur = () => {};

  setText = (value) => {
    this.setState({val: value});
  };

  getValue = () => {
    const {editPhoneNumberForm} = this.props;
    const {isValidNumber} = this.state;

    if (this.props.type == INPUT_TYPES.MOBILE_NUMBER && editPhoneNumberForm) {
      return {
        isValidNumber: this.state.isValidNumber,
        value: this.state.val,
        // countryCode :
      };
    } else if (
      this.props.type == INPUT_TYPES.MOBILE_NUMBER &&
      editPhoneNumberForm
    ) {
      return {
        isValidNumber: this.state.isValidNumber,
        value: this.state.val,
        // countryCode :
      };
    } else if (this.props.id !== undefined) {
      return this.state.id;
    }

    return this.state.val;
  };

  componentIcon = (icon) => {
    if (this.state.expanded || icon) {
      return (
        <Image
          resizeMode="contain"
          source={icon}
          // style={[this.tintColorStyle, { width: 24, height: 24 }, { tintColor: this.state.expanded && '#B00020' }]}
          // style={[{width: 24, height: 24}]}
        />
      );
    } else {
      return <Text style={this.colorStyle}> {this.props.rightText}</Text>;
    }
  };
  focus = () => {
    this.textInput.focus();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({val: this.props.value});
    }

    if (
      this.phone &&
      !_.isUndefined(this.phone) &&
      this.phone.isValidNumber() !== this.state.isValidNumber
    ) {
      console.log('andar :', this.phone);
      this.setState({isValidNumber: true});
    }
  }

  // phone number

  onPressFlag() {
    // console.log('this.countryPicker : ', this.countryPicker);
    this.countryPicker.onOpen();
    // this.selectCountry();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({
      cca2: country.cca2,
      countryCode: `+${country.callingCode[0]}`,
    });
  }
  setStyle = (color, lightNavy, darkBlueGrey, slateTwo) => {
    if (color === 'lightNavy') {
      return lightNavy;
    } else if (color === 'darkBlueGrey') {
      return darkBlueGrey;
    } else return slateTwo;
  };
  render() {
    const {
      viewStyle,
      placeholderTextinput,
      placeholderTextColor,
      textInputStyle,
      leftIcon,
      rightText,
      rightIcon,
      viewColor,
      lightNavy,
      color,
      options,
      id,
    } = this.props;
    const {
      lightNavyTextFieldStyle,
      darkSkyBlueTextFieldStyle,
      slateTwoTextFieldStyle,
      inputTextStyle,
      whiteInputText,
      transparentWhiteInputText,
      slateTwoInputText,
      container,
    } = styles;

    if (!_.isEmpty(options) && options[0].name) {
      showOptions = options.map((item) => {
        return item.name;
      });
    } else if (!_.isEmpty(options) && options[0].community_name) {
      showOptions = options.map((item) => {
        return item.community_name;
      });
    } else if (!_.isEmpty(options) && options[0].category_name) {
      showOptions = options.map((item) => {
        return item.category_name;
      });
    } else {
      showOptions = {category_name: 'NOT LOADED'};
    }

    return (
      <>
        <View style={viewStyle}>
          <ModalDropdown
            dropdownStyle={{
              backgroundColor:
                color === 'lightNavy'
                  ? Colors.background.white
                  : Colors.background.white,
              width: '93%',
            }}
            dropdownTextStyle={{
              ...slateTwoInputText,
              backgroundColor:
                color === 'lightNavy'
                  ? Colors.background.lightNavy
                  : Colors.background.lightGray,
              //            ...AppStyles.gbRe(12, Colors.text.slateTwo),
              color:
                color === 'lightNavy'
                  ? Colors.text.white
                  : Colors.text.slateGrey,
            }}
            onSelect={(idx, value) => {
              if (value == 'NOT LOADED') {
                return;
              }
              const data = options[idx];

              id !== undefined
                ? this.setState({val: value, isError: false, id: data[id]})
                : this.setState({val: value, isError: false});

              this.props.selectedCB && this.props.selectedCB(data);
            }}
            textStyle={{
              color:
                color === 'lightNavy'
                  ? Colors.text.white
                  : Colors.text.slateGrey,
            }}
            dropdownTextHighlightStyle={{
              // ...AppStyles.gbRe(18, Colors.text.darkSkyBlue),
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'Cochin',
            }}
            options={showOptions}>
            {(leftIcon || this.state.expanded) && (
              <TouchableOpacity
                onPress={this.props.onLeftPress}
                style={styles.leftIconStyle}>
                {this.componentIcon(leftIcon)}
              </TouchableOpacity>
            )}
            <View
              style={[
                container,
                this.setStyle(
                  color,
                  lightNavyTextFieldStyle,
                  darkSkyBlueTextFieldStyle,
                  slateTwoTextFieldStyle,
                ),
                // viewStyle,{}
                {width: '90%', alignSelf: 'center'},
              ]}>
              <TextInput
                // pointerEvents={
                //   !_.isUndefined(this.props.pointerEvents) ? 'none' : null
                // }
                pointerEvents="none"
                editable={false}
                autoCapitalize="none"
                ref={(ref) => (this.textInput = ref)}
                style={[
                  inputTextStyle,
                  this.setStyle(
                    color,
                    whiteInputText,
                    transparentWhiteInputText,
                    slateTwoInputText,
                  ),
                ]}
                // onFocus={this.handleFocus}
                // onBlur={this.handleBlur}

                placeholder={placeholderTextinput}
                placeholderTextColor={this.setStyle(
                  color,
                  whitePlaceholder,
                  transparentWhitePlaceholder,
                  slateGreyPlaceholder,
                )}
                onChangeText={(text) => {
                  if (
                    this.props.identifier === 'first_name' ||
                    this.props.identifier === 'last_name'
                  ) {
                    utility.alphanumeric(text) &&
                      this.setState({val: text, isError: false});
                  } else {
                    this.setState({val: text, isError: false});
                    // console.log('changeText  show : ', this.props.changeText);
                    if (this.props.changeText) {
                      this.props.changeText(text);
                    }
                  }
                }}
                blurOnSubmit={false}
                value={this.state.val}
                multiline={this.props.multiline && true}
                maxLength={this.props.maxLength}
                autoCorrect={false}
                keyboardType={this.props.keyboardTypeCustom}
                secureTextEntry={this.props.secureTextEntry}
                selectionColor={this.props.selectionColor}
                returnKeyType={this.props.returnKeyType}
                //   onSubmitEditing={this.props.onSubmitEditing}
                onSubmitEditing={
                  this.props.returnKeyType == 'done'
                    ? Keyboard.dismiss
                    : this.props.onSubmitEditing
                }
              />

              {(rightText || rightIcon || this.state.expanded) && (
                <TouchableOpacity
                  onPress={this.props.onRightPress}
                  style={styles.righticonStyle}>
                  {this.componentIcon(rightIcon)}
                </TouchableOpacity>
              )}
            </View>
          </ModalDropdown>
          {this.state.isError && (
            <Text style={styles.errorStyle}>{this.state.error}</Text>
          )}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.heightRatio(12),
    flexDirection: 'row',
    height: Metrics.heightRatio(65),
    borderRadius: 5,
    // ...AppStyles.appWidthHorizontal(),
  },
  righticonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  leftIconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  txtInputStyle: {
    minHeight: 52,
    height: 52,
    // fontSize: 20,
    color: '#000',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    alignSelf: 'stretch',
    flex: 1,
    // backgroundColor: 'red',
  },
  errorStyle: {
    color: '#B00020',
    paddingLeft: 15,
    // marginTop: 5,
  },
  borderStyle: {
    borderRadius: 4,
    flexDirection: 'row',
  },

  darkSkyBlueTextFieldStyle: {
    backgroundColor: Colors.background.darkSkyBlue,
    // opacity: 0.5,
  },
  lightNavyTextFieldStyle: {
    backgroundColor: Colors.background.darkSkyBlue,
  },
  lightNavyDropDownText: {
    // ...AppStyles.gbRe(18, Colors.text.slateTwo),
  },
  slateTwoTextFieldStyle: {
    // backgroundColor: Colors.background.lightGray,
    backgroundColor: Colors.background.darkSkyBlue,

    // opacity: 0.08,
  },
  inputTextStyle: {
    marginLeft: Metrics.baseMargin,
    flex: 1,
  },
  whiteInputText: {
    // ...AppStyles.gbRe(18, Colors.text.white),
  },
  transparentWhiteInputText: {
    // ...AppStyles.gbRe(18, Colors.text.white),
    // opacity: 0.8,
  },
  slateTwoInputText: {
    // ...AppStyles.gbRe(18, Colors.text.slateTwo),
  },
});
