import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  ButtonComponent,
  Container,
  DateTimePickerComponent,
  DropdownPickerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../components';
import {Task} from '../types';
import {getRandomImage} from '../utils';

type SelectType = {
  value: string;
  label: {
    displayName: string;
    photoURL: string;
    email: string;
  };
};

const initValue: Task = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  users: [],
  isUrgent: false,
};

const AddTaskScreen = () => {
  const [data, setData] = useState<Task>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectType[]>([]);
  const user = auth().currentUser;

  const navigation = useNavigation();

  useEffect(() => {
    handleGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    setData(prev => ({...prev, [id]: value}));
  };

  const handleAddNewTask = async () => {
    const newData: Task = {
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await firestore().collection('tasks').add(newData);
      navigation.goBack();
    } catch (error) {
      console.log({error});
    }
  };

  const handleGetAllUsers = async () => {
    const snapshot = await firestore().collection('users').get();
    const items: SelectType[] = [];
    snapshot.forEach(item => {
      items.push({
        label: {
          email: item.data().email,
          displayName: item.data().displayName || 'Unnamed',
          photoURL: item.data().photoURL || getRandomImage(),
        },
        value: item.id,
      });
    });
    // remove me from list users
    const itemsRemovedMe = items.filter(item => item.value !== user?.uid);
    setUsersSelect(itemsRemovedMe);
  };

  return (
    <Container isScroll back title="Add new task">
      <SectionComponent>
        <InputComponent
          value={data.title}
          onChange={value => handleChangeValue('title', value)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={data.description}
          onChange={value => handleChangeValue('description', value)}
          title="Description"
          allowClear
          placeholder="Description"
          multiline
          numberOfLine={3}
        />
        <DateTimePickerComponent
          type="date"
          title="Due date"
          placeholder="Choice"
          selected={data.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
        />
        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              type="time"
              title="Start"
              selected={data.start}
              onSelect={val => handleChangeValue('start', val)}
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              type="time"
              title="End"
              selected={data.end}
              onSelect={val => handleChangeValue('end', val)}
            />
          </View>
        </RowComponent>

        <DropdownPickerComponent
          selected={data.users}
          items={usersSelect}
          onSelect={val => handleChangeValue('users', val)}
          title="Members"
          multiple
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent text="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
};

export default AddTaskScreen;
