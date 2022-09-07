import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/pages/LoginScreen';

export default function App() {
  const [userLoggedIn, toggleLogin] = useState(null);
  const [number, setPhone] = useState(null);
  const [verificationId, setVerificationId] = useState(null);

  const phoneInput = async (phoneNumber) => {
    const data = {
      phone: `+1${phoneNumber}`,
    };
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
          [{ text: 'Dismiss', style: 'cancel' }]
        );
      }
    }
  };

  const codeInput = async (code) => {
    const data = {
      phone: number,
      code,
    };
    try {
      const res = await axios.put(`${MOBILE_API_URL}/verification`, data);
      if (res.data?.status === 'approved') {
        const verificationData = res.data;
        const allData = { ...userLoggedIn, ...verificationData };
        localStorageFuntions.storeToken(allData);
        toggleLogin({ data: allData });
      } else {
        Alert.alert(
          'Wrong code',
          "You've entered an invalid code, did you need a new one?",
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Resend code',
              onPress: () => {
                resendCode();
              },
            },
          ]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const profileInput = async (props) => {
    try {
      const user = {
        firstName: props.firstName,
        lastName: props.lastName,
        MCNumber: props.MCNumber,
        phone: props.data.to,
        id: props.data.sid,
      };
      await axios.post(`${MOBILE_API_URL}/createUser`, user);
      const verificationData = await localStorageFuntions.getToken();
      const allData = { ...{ userData: user }, ...verificationData };
      toggleLogin({ data: allData });
      localStorageFuntions.storeToken(allData);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToPhoneInput = () => {
    if (userLoggedIn) {
      toggleLogin(null);
    }
    setPhone(null);
    setVerificationId(null);
  };

  const resendCode = () => {
    phoneInput(number.replace('+1', ''));
  };

  return (
    <LoginScreen
      props={{
        phoneInput,
        verificationId,
        codeInput,
        userLoggedIn,
        profileInput,
        redirectToPhoneInput,
        resendCode,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
