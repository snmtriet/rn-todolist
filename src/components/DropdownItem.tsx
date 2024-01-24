import {View, Image} from 'react-native';
import React, {memo} from 'react';
import {
  CardComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '.';
import {colors} from '../constants/colors';
import {TickCircle} from 'iconsax-react-native';

interface Props {
  handleSelectItem: (value: string) => void;
  item: {
    label: {
      displayName: string;
      photoURL: string;
      email: string;
    };
    value: string;
  };
  dataSelected: string[];
}

const DropdownItem = (props: Props) => {
  const {handleSelectItem, item, dataSelected} = props;

  return (
    <CardComponent
      styles={{
        marginBottom: 12,
        borderWidth: 1,
        borderColor: dataSelected.includes(item.value)
          ? colors.success
          : 'transparent',
      }}>
      <RowComponent
        justify="space-between"
        onPress={() => handleSelectItem(item.value)}>
        <RowComponent justify="flex-start" key={item.value}>
          <View
            style={{
              width: 56,
              height: 56,
              borderWidth: 3,
              borderRadius: 100,
              borderColor: colors.white,
            }}>
            <Image
              source={{
                uri: item.label.photoURL,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
              }}
            />
          </View>
          <SpaceComponent width={10} />
          <View>
            <TitleComponent
              size={16}
              text={item.label.displayName}
              color={colors.text}
            />
            <TextComponent
              size={12}
              text={item.label.email}
              color={colors.text}
            />
          </View>
        </RowComponent>
        {dataSelected.includes(item.value) && (
          <TickCircle size={22} color={colors.success} />
        )}
      </RowComponent>
    </CardComponent>
  );
};

export default memo(DropdownItem);
