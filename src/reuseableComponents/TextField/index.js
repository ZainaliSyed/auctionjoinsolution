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
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import utility from '../../utility';

import {INPUT_TYPES} from '../FormHandler/Constants';

export default class TextfieldPlaceholder extends Component {
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
    rightIcon: null,
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
    console.log('setText : textfield', value);
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
      console.log(
        'editPhoneNumberForm : ',
        this.state.val,
        'isValidNumber : ',
        isValidNumber,
      );
      return {
        isValidNumber: this.state.isValidNumber,
        value: this.state.val,
        // countryCode :
      };
    }

    return this.state.val;
  };

  componentIcon = () => {
    if (this.props.rightIcon || this.state.expanded) {
      return (
        <Image
          resizeMode="contain"
          source={
            this.state.expanded ? this.props.rightIcon : this.props.rightIcon
          }
          // style={[this.tintColorStyle, { width: 24, height: 24 }, { tintColor: this.state.expanded && '#B00020' }]}
          style={[{width: 24, height: 24}]}
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

  render() {
    const {viewStyle, countryField} = this.props;
    return (
      <View
        style={[
          {
            marginTop: 5,
            backgroundColor: Colors.background.white,
            height: 50,
            borderWidth: 1,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 5,
          },
          viewStyle,
        ]}>
        <TextInput
          pointerEvents={
            !_.isUndefined(this.props.pointerEvents) ? 'none' : null
          }
          autoCapitalize="none"
          ref={(ref) => (this.textInput = ref)}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Cochin',
            marginLeft: Metrics.baseMargin,
            flex: 1,
          }}
          placeholder={this.props.placeholderTextinput}
          placeholderTextColor={Colors.text.darkBlueGreyTwo}
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
          editable={this.props.editable}
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

        {(this.props.rightText ||
          this.props.rightIcon ||
          this.state.expanded) && (
          <TouchableOpacity
            onPress={this.props.onRightPress}
            style={styles.iconStyle}>
            {this.componentIcon()}
          </TouchableOpacity>
        )}
        {this.state.isError && (
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
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
    marginTop: 5,
  },
  borderStyle: {
    borderRadius: 4,
    flexDirection: 'row',
  },
});
