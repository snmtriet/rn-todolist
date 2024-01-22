import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddTaskScreen, HomeScreen} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigatorParamList} from '../types';

const Router = () => {
  const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;