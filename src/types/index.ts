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
  id?: string;
  title: string;
  description: string;
  dueDate?: Date;
  start?: Date;
  end?: Date;
  users: string[];
  color?: string;
  attachments?: Attachment[];
  progress?: number;
  createdAt?: number;
  isUrgent: boolean;
  updatedAt?: number;
}

export interface Attachment {
  name: string;
  url: string;
  size: number;
  type?: string;
}

export interface SubTask {
  createdAt: number;
  description: string;
  id: string;
  isCompleted: boolean;
  taskId: string;
  title: string;
  updatedAt: number;
}
