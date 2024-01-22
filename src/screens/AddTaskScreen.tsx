import React, {useState} from 'react';
import {
  Container,
  DateTimePickerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../components';
import {Task} from '../types';
import {Button, View} from 'react-native';

const initValue: Task = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  users: [],
  fileUrls: [],
};

const AddTaskScreen = () => {
  const [data, setData] = useState<Task>(initValue);

  const handleChangeValue = (id: string, value: string | Date) => {
    setData(prev => ({...prev, [id]: value}));
  };

  const handleAddNewTask = async () => {
    console.log({data});
  };

  return (
    <Container back title="Add new task">
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
      </SectionComponent>
      <SectionComponent>
        <Button title="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
};

export default AddTaskScreen;
