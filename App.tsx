import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Router from './src/routes/Router';
import {colors} from './src/constants/colors';

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bgColor} />
        <Router />
      </SafeAreaView>
    </>
  );
};

export default App;
