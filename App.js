import React, { Fragment } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingScreen from './components/pages/LandingScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <Fragment>
        <LandingScreen />
      </Fragment>
    </SafeAreaProvider>
  );
}
