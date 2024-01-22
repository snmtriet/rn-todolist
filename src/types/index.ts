import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackNavigatorParamList = {
  HomeScreen: undefined;
  AddTaskScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  'AddTaskScreen'
>;
