import React from 'react';
import { StatusBar } from 'react-native';

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);

import { StorageProvider } from './src/modules/appProvider/states/Storage';

import ThemeProvider from './src/common/providers/ThemeProvider';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <StorageProvider>
      <ThemeProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <RootNavigation />
      </ThemeProvider>
    </StorageProvider>
  );
};

export default App;
