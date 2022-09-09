import React, { useState, useEffect, Component } from 'react';
import { StatusBar, Alert, Platform  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './components/pages/LoginScreen/index';
import LandingScreen from './components/pages/LandingScreen/index';
import SplashLoad from './components/pages/SplashLoad/index';
import localStorageFuntions from './local_modules/localStorage';
import wait from './local_modules/wait';

const MOBILE_API_URL = 'https://api.freightvana.io/app/tracking';

const MyTheme = {
  dark: true,
  colors: {
    primary: '#FAC832',
    background: '#121212',
    card: '#121212',
    text: 'white',
    border: '#121212',
    notification: '#FAC832',
  },
};

class MyTabs extends Component {
  constructor(props){
    super(props);
  }
  render () {
    const { props } = this.props;
    return (
      <React.Fragment>
        <LandingScreen extraData={props} />
      </React.Fragment>
    );
  }
}

export default function App() {
  const [userLoggedIn, toggleLogin] = useState(null);
  const [number, setPhone] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [splashLoad, toggleSplash] = useState(true);

  useEffect(() => {
    let localData;
    const grabData = async () => {
      localData = await localStorageFuntions.getToken();
      if (localData?.userData) {
        toggleLogin({ data: localData });
      }
    }
    grabData();
  }, []);

  const phoneInput = async (phoneNumber) => {
    const data = {
      phone: `+1${phoneNumber}`
    }
    try {
      const res = await axios.post(`${MOBILE_API_URL}/newUser`, data);
      if (res.status === 200) {
        if (res.data?.existingUser.length > 0) {
          toggleLogin({ userData: res.data.existingUser[0] });
        }
        setPhone(data.phone);
        setVerificationId({ data: res.data.data });
      }
    } catch (err) {
      if (err.response.data['Twilio auth error']) {
        Alert.alert(
          'Max attempts',
          "You've requested a code too many times, please wait 10 minutes until your next attempt",
          [
            { text: 'Dismiss', style: 'cancel' }
          ]
        );
      }
    }
  }
  const codeInput = async (code) => {
    const data = {
      phone: number,
      code
    }
    try {
      const res = await axios.put(`${MOBILE_API_URL}/verification`, data);
      if (res.data?.status === 'approved') {
        const verificationData = res.data;
        const allData = {...userLoggedIn, ...verificationData}
        localStorageFuntions.storeToken(allData);
        toggleLogin({ data: allData });
      } else {
        Alert.alert(
          'Wrong code',
          "You've entered an invalid code, did you need a new one?",
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Resend code', onPress: () => { resendCode() } }
          ]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  const profileInput = async (props) => {
    try {
      const user = {
        firstName: props.firstName,
        lastName: props.lastName,
        MCNumber: props.MCNumber,
        phone: props.data.to,
        id: props.data.sid
      }
      await axios.post(`${MOBILE_API_URL}/createUser`, user);
      const verificationData = await localStorageFuntions.getToken();
      const allData = {...{ userData: user }, ...verificationData}
      toggleLogin({ data: allData });
      localStorageFuntions.storeToken(allData);
    } catch (err) {
      console.log(err);
    }
  }
  const redirectToPhoneInput = () => {
    if (userLoggedIn) {
      toggleLogin(null)
    }
    setPhone(null);
    setVerificationId(null);
  }
  const resendCode = () => {
    phoneInput(number.replace('+1', ''))
  }
  if (userLoggedIn?.data?.userData?.MCNumber) {
    wait(3000).then(() => {
      toggleSplash(false)
    });
    return (
      <SafeAreaProvider>
      {
        splashLoad ?
        <SplashLoad userLoggedIn={userLoggedIn} />
        :
        <NavigationContainer theme={ MyTheme }>
          <StatusBar barStyle={'light-content'} />
          <MyTabs props={{ userLoggedIn, phoneInput, toggleLogin, setPhone, setVerificationId }} />
        </NavigationContainer>
      }
      </SafeAreaProvider>
    );
  } else {
    return (
      <LoginScreen props={{ phoneInput, verificationId, codeInput, userLoggedIn, profileInput, redirectToPhoneInput, resendCode }} />
    )
  }
}
