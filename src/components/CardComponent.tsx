import {View, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const CardComponent = (props: Props) => {
  const {children, styles, bgColor} = props;
  return (
    <View
      style={[
        globalStyles.inputContainer,
        {
          padding: 12,
          backgroundColor: bgColor ?? colors.gray,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CardComponent;
