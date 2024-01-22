import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddTaskScreen, HomeScreen} from '../screens';
import {NavigationContainer} from '@react-navigation/native';

const Router = () => {
  const Stack = createNativeStackNavigator();
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
