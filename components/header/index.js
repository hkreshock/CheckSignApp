import React from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';

function FreightvanaLogo () {
  return (
    <Image source={require('../../assets/freightvana-icon-transparent.png')} style={{ width: 30, height: 30, top: 10, left: 10 }} PlaceholderContent={<ActivityIndicator />} />
  );
}

function HeaderComponent(props) {
  return (
    <Appbar.Header style={{ backgroundColor: '#121212', borderBottomWidth: 10, borderBottomColor: '#121212' }}>
      <FreightvanaLogo />
    </Appbar.Header>
  );
}

export default HeaderComponent;