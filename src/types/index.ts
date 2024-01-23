import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackNavigatorParamList = {
  HomeScreen: undefined;
  AddTaskScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  'AddTaskScreen'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  'RegisterScreen'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  'LoginScreen'
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
