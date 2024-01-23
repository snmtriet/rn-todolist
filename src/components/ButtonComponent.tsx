import {TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  text: string;
  icon?: ReactNode;
  onPress: () => void;
  color?: string;
  isLoading?: boolean;
}

const ButtonComponent = (props: Props) => {
  const {text, onPress, color, isLoading} = props;

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={{
        backgroundColor: color ?? colors.blue,
        padding: Platform.OS === 'ios' ? 16 : 8,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          size={16}
          styles={{textTransform: 'uppercase', lineHeight: 22}}
          font={fontFamilies.semiBold}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
