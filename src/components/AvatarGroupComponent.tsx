import React from 'react';
import RowComponent from './RowComponent';
import {Image, View} from 'react-native';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

const AvatarGroupComponent = () => {
  const users = 10;
  const imageUrl = 'https://avatars.githubusercontent.com/u/75319942?v=4';
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };
  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
      {Array.from({length: users}).map(
        (_, index) =>
          index < 3 && (
            <Image
              source={{uri: imageUrl}}
              key={`image${index}`}
              style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
            />
          ),
      )}

      {users > 5 && (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: colors.blue,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}>
          <TextComponent
            flex={0}
            styles={{
              lineHeight: 19,
            }}
            font={fontFamilies.semiBold}
            text={`+${users - 3 > 9 ? 9 : users - 3}`}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarGroupComponent;
