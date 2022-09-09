import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { View, Dimensions, Platform, Text, Image, ActivityIndicator } from 'react-native';
import animationJSON from './animation.json';

const windowHeight = Platform.OS !== 'web' ? Dimensions.get('window').height : window.screen.height * 0.5;
const windowWidth = Platform.OS !== 'web' ? Dimensions.get('window').width : window.screen.width;

// Main Component

class SplashLoad extends Component {
  constructor(props){
    super(props);
  }
  render () {
    const { userLoggedIn } = this.props;
    const { firstName } = userLoggedIn.data.userData;
    return (
      <View style={{ backgroundColor: 'black', width: windowWidth, height: windowHeight, flex: 1, alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: windowHeight*.3, textAlign: 'center', fontWeight: 'bold', color: '#FAC832', fontSize: '30pt' }}>Welcome {firstName}</Text>
        {
          Platform.OS !== 'web' ?
          <LottieView source={animationJSON} autoPlay loop />
          :
          <Image source={require('../../../assets/white-truck.png')} style={{ width: 100, height: 100, marginTop: 40 }} PlaceholderContent={<ActivityIndicator />} />
        }
        <Text style={{ marginTop: windowHeight*.3, textAlign: 'center', color: '#FAC832', padding: 10, fontSize: '22pt' }}>Please wait while we grab your info!</Text>
      </View>
    );
  }
}

export default SplashLoad;