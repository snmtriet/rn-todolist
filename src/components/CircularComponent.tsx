import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number;
}

const CircularComponent = (props: Props) => {
  const {value, color, maxValue, radius} = props;
  return (
    <CircularProgress
      value={value}
      title={`${value}%`}
      maxValue={maxValue}
      titleFontSize={20}
      radius={radius ?? 46}
      activeStrokeWidth={14}
      inActiveStrokeWidth={14}
      titleColor={colors.text}
      showProgressValue={false}
      inActiveStrokeColor="#3C444A"
      activeStrokeColor={color ?? colors.blue}
      titleStyle={{
        fontFamily: fontFamilies.medium,
      }}
    />
  );
};

export default CircularComponent;
