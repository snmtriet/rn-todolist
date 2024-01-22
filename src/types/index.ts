import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackNavigatorParamList = {
  HomeScreen: undefined;
  AddTaskScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  'AddTaskScreen'
>;

export interface Task {
  title: string;
  description: string;
  dueDate: Date;
  start: Date;
  end: Date;
  users: string[];
  color?: string;
  fileUrls: string[];
}
