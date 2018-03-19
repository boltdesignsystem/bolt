import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const Button = props => (
  <TouchableOpacity
    testID={props.testID}
    accessibilityLabel={props.testID}
    style={{
      backgroundColor: 'blue',
      padding: 5,
      margin: 5,
      width: 200,
    }}
    onPress={props.onPress}
  >
    <Text style={{ color: 'white', textAlign: 'center' }}>
      {props.buttonText}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  testID: PropTypes.string,
};

Button.defaultProps = {
  onPress: () => {},
  buttonText: 'click here',
  testID: 'button',
};

export default Button;
