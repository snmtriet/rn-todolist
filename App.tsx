import React from 'react';
import {HomeScreen} from './src/screens';
import {SafeAreaView, StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <HomeScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
