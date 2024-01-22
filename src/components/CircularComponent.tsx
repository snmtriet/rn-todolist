import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
}

const CircularComponent = (props: Props) => {
  const {value, color, maxValue} = props;
  return (
    <CircularProgress
      value={value}
      title={`${value}%`}
      maxValue={maxValue}
      titleFontSize={32}
      titleColor={colors.text}
      showProgressValue={false}
      inActiveStrokeColor="#3C444A"
      activeStrokeColor={color ?? colors.blue}
      titleStyle={{
        fontFamily: fontFamilies.semiBold,
      }}
    />
  );
};

export default CircularComponent;
