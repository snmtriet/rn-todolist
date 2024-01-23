import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddTaskScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigatorParamList} from '../types';
import auth from '@react-native-firebase/auth';

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

  const MainNavigator = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </Stack.Navigator>
  );

  const AuthNavigator = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsLogin(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {isLogin ? MainNavigator : AuthNavigator}
    </NavigationContainer>
  );
};

export default Router;
