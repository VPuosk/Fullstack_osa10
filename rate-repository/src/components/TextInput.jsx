import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  errorInputBox: {
    borderColor: theme.colors.errorTextColor
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    error && styles.errorInputBox,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;