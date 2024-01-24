import {View, Modal, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import {globalStyles} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {ArrowDown2, CloseSquare, SearchNormal1} from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponent from './SpaceComponent';
import DropdownItem from './DropdownItem';

type SelectType = {
  label: {
    displayName: string;
    email: string;
    photoURL: string;
  };
  value: string;
};

interface Props {
  title?: string;
  items: SelectType[];
  selected?: string[];
  onSelect: (val: string[]) => void;
  multiple?: boolean;
}

const DropdownPickerComponent = (props: Props) => {
  const {title, items, selected, onSelect, multiple} = props;

  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<SelectType[]>([]);
  const [dataSelected, setDataSelected] = useState<string[]>([]);

  useEffect(() => {
    selected && setDataSelected(selected);
  }, [isVisible, selected]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
      return;
    }

    const data = items.filter(element =>
      element.label.email.toLowerCase().includes(searchKey.toLowerCase()),
    );
    setResults(data);
  }, [items, searchKey]);

  const handleSelectItem = (id: string) => {
    const data = multiple ? [...dataSelected] : [id];
    const index = data.findIndex(element => element === id);
    index !== -1 ? data.splice(index, 1) : data.push(id);
    setDataSelected(data);
  };

  const handleConfirmSelect = () => {
    onSelect(dataSelected);
    setIsVisible(false);
    setDataSelected([]);
  };

  const handleRemoveItemSelected = (index: number) => {
    if (selected) {
      selected.splice(index, 1);
      onSelect(selected);
    }
  };

  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find(element => element.value === id);

    return (
      item && (
        <RowComponent
          onPress={() => handleRemoveItemSelected(index)}
          key={id}
          styles={{
            marginRight: 4,
            padding: 6,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: colors.gray2,
            marginBottom: 8,
          }}>
          <TextComponent text={item.label.email} flex={0} />
          <SpaceComponent width={8} />
          <AntDesign name="close" size={14} color={colors.text} />
        </RowComponent>
      )
    );
  };

  return (
    <View style={{marginBottom: 16}}>
      {title && <TitleComponent text={title} />}
      <RowComponent
        onPress={() => setIsVisible(true)}
        styles={[
          globalStyles.inputContainer,
          {marginTop: title ? 8 : 0, paddingVertical: 16},
        ]}>
        <View style={{flex: 1, paddingRight: 12}}>
          {selected && selected?.length > 0 ? (
            <RowComponent justify="flex-start" styles={{flexWrap: 'wrap'}}>
              {selected.map((id, index) => renderSelectedItem(id, index))}
            </RowComponent>
          ) : (
            <TextComponent text="Select" color={colors.gray2} flex={0} />
          )}
        </View>
        <ArrowDown2 size={20} color={colors.text} />
      </RowComponent>

      <Modal
        visible={isVisible}
        style={{flex: 1}}
        transparent
        animationType="slide"
        statusBarTranslucent>
        <View
          style={[
            globalStyles.container,
            {
              padding: 20,
              paddingTop: 60,
              paddingBottom: 60,
            },
          ]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <RowComponent
                styles={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1, marginRight: 12}}>
                  <InputComponent
                    value={searchKey}
                    onChange={val => setSearchKey(val)}
                    placeholder="Search..."
                    prefix={<SearchNormal1 size={22} color={colors.gray2} />}
                    allowClear
                  />
                </View>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <CloseSquare
                    size={30}
                    color={colors.error}
                    style={{marginBottom: 15}}
                  />
                </TouchableOpacity>
              </RowComponent>
            }
            style={{flex: 1}}
            data={searchKey ? results : items}
            renderItem={({item}) => (
              <DropdownItem
                dataSelected={dataSelected}
                handleSelectItem={handleSelectItem}
                item={item}
                key={item.value}
              />
            )}
          />
          <ButtonComponent text="Confirm" onPress={handleConfirmSelect} />
        </View>
      </Modal>
    </View>
  );
};

export default DropdownPickerComponent;
