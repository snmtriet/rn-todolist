import {View, Modal, Button} from 'react-native';
import React, {useState} from 'react';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {ArrowDown2} from 'iconsax-react-native';
import {globalStyles} from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title?: string;
  placeholder?: string;
  selected?: Date;
  onSelect: (val: Date) => void;
}

const DateTimePickerComponent = (props: Props) => {
  const {selected, onSelect, placeholder, title, type} = props;

  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());

  const renderText = () => {
    const hours = selected?.getHours();
    const minutes = selected?.getMinutes();
    const month = selected?.getMonth();
    const year = selected?.getFullYear();

    return selected
      ? type === 'time'
        ? `${hours}:${minutes}`
        : `${selected.getDate()}/${month! + 1}/${year}`
      : placeholder ?? '';
  };

  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title} />}
        <RowComponent
          onPress={() => setOpenModal(true)}
          styles={[
            globalStyles.inputContainer,
            {marginTop: title ? 8 : 0, paddingVertical: 16},
          ]}>
          <TextComponent
            flex={1}
            text={renderText()}
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </RowComponent>
      </View>

      <Modal visible={openModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              width: '90%',
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 20,
            }}>
            <TitleComponent text="Date time picker" color={colors.blue} />
            <View>
              <DatePicker
                mode={type}
                date={date}
                onDateChange={val => setDate(val)}
              />
            </View>
            <SpaceComponent height={20} />
            <RowComponent justify="flex-end">
              <Button title="Close" onPress={() => setOpenModal(false)} />
              <SpaceComponent width={10} />
              <Button
                title="Confirm"
                onPress={() => {
                  onSelect(date);
                  setOpenModal(false);
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponent;
