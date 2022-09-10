import React, { Fragment } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Fragment>
        <LandingScreen />
      </Fragment>
    </SafeAreaProvider>
  );
}
