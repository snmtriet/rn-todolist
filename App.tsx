import React from 'react';
import {HomeScreen} from './src/screens';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <HomeScreen />
    </>
  );
};

export default App;
