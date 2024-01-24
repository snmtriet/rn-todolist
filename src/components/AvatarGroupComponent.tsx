import React from 'react';
import RowComponent from './RowComponent';
import {Image, View} from 'react-native';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {getRandomImage} from '../utils';

interface Props {
  users: string[];
}

const AvatarGroupComponent = (props: Props) => {
  const {users} = props;
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };
  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
      {Array.from({length: users.length}).map(
        (_, index) =>
          index < 3 && (
            <Image
              source={{uri: getRandomImage()}}
              key={`image${index}`}
              style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
            />
          ),
      )}

      {users.length > 5 && (
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
            text={`${users.length - 3 > 9 ? 9 : users.length - 3}+`}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarGroupComponent;
