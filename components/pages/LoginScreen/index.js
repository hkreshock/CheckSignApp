import React, { useState } from 'react';
import { View, Dimensions, ActivityIndicator, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const FROM_COLOR = 'rgb(140, 140, 140)';
const TO_COLOR = '#121212';

// Main Component

function LoginPage({ props }) {
  const { phoneInput, verificationId, codeInput, userLoggedIn, profileInput, redirectToPhoneInput, resendCode } = props;
  const [phone, updatePhone] = useState('');
  const [code, setVerificationCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [MCNumber, setMC] = useState('');
  const [resent, codeResent] = useState(false);
  const [currentLoad, updateCurrentLoad] = useState(null);

  const compileProfile = () => {
    const userProfile = {
      firstName,
      lastName,
      MCNumber
    }
    const mergedData = {...userLoggedIn, ...userProfile}
    profileInput(mergedData)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <Svg height='100%' width='100%' style={ StyleSheet.absoluteFillObject }>
        <Defs>
          <LinearGradient id='grad' x1='0%' y1='0%' x2='0%' y2='100%'>
            <Stop offset='0' stopColor={ FROM_COLOR }/>
            <Stop offset='1' stopColor={ TO_COLOR }/>
          </LinearGradient>
        </Defs>
        <Rect width='100%' height='100%' fill='url(#grad)'/>
      </Svg>
      <KeyboardAvoidingView behavior={ Platform.OS === 'ios'? 'padding': null } style={{ flexGrow: 1 }} >
        <ScrollView>
          {
            userLoggedIn?.data ?
              <View style={{ width: windowWidth, height: windowHeight, marginTop: windowHeight * .25, alignContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ color: '#FAC832', fontSize: 30, fontWeight: 'bold' }}>Just a little more info...</Text>
                <View style={{ marginTop: 55 }}>
                  <TextInput
                    label='FIRST NAME'
                    value={firstName}
                    onChangeText={value => { setFirstName(value) }}
                    placeholder='John'
                    style={{ width: windowWidth * .8 }}
                    selectionColor='white'
                    left={<TextInput.Icon icon='account-box' style={{ fontSize: 24 }} />}
                    theme={{
                      colors: {
                        placeholder: 'white', text: 'white', primary: 'white',
                        underlineColor: 'transparent', background: '#003489'
                      }
                    }}
                  />
                  <TextInput
                    label='LAST NAME'
                    value={lastName}
                    onChangeText={value => { setLastName(value) }}
                    placeholder='Appleseed'
                    style={{ width: windowWidth * .8 }}
                    selectionColor='white'
                    left={<TextInput.Icon icon='account-box' style={{ fontSize: 24 }} />}
                    theme={{
                      colors: {
                        placeholder: 'white', text: 'white', primary: 'white',
                        underlineColor: 'transparent', background: '#003489'
                      }
                    }}
                  />
                  <TextInput
                    label='MC NUMBER'
                    value={MCNumber}
                    onChangeText={value => { setMC(value) }}
                    placeholder='XXXXXXX'
                    style={{ width: windowWidth * .8 }}
                    selectionColor='white'
                    left={<TextInput.Icon icon='local-shipping' style={{ fontSize: 24 }} />}
                    theme={{
                      colors: {
                        placeholder: 'white', text: 'white', primary: 'white',
                        underlineColor: 'transparent', background: '#003489'
                      }
                    }}
                  />
                </View>
                <Button
                  title='COMPLETE REGISTRATION'
                  titleStyle={{ color: '#121212' }}
                  disabledTitleStyle={{ color: 'rgb(140, 140, 140)' }}
                  containerStyle={{ width: windowWidth * .8, backgroundColor: '#FAC832', borderRadius: 25 }}
                  disabled={!firstName || !lastName || !MCNumber}
                  type='standard'
                  onPress={() => {compileProfile()}}
                ></Button>
              </View>
              :
              <View style={{ width: windowWidth, height: windowHeight, marginTop: windowHeight*.25, alignContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/freightvana-logo-white.png')} style={{ width: windowWidth * .4, height: windowWidth * .4 }} PlaceholderContent={<ActivityIndicator />} />
                <View style={{ marginTop: 50, marginBottom: 25 }}>
                  {
                    verificationId === null ?
                    <TextInput
                      label='PHONE NUMBER'
                      value={phone}
                      onChangeText={value => { updatePhone(value) }}
                      placeholder='+1 999 999 9999'
                      keyboardType='number-pad'
                      style={{ width: windowWidth * .8 }}
                      selectionColor='white'
                      left={<TextInput.Icon icon='phone' style={{ fontSize: 24 }} />}
                      theme={{
                        colors: {
                          placeholder: 'white', text: 'white', primary: 'white',
                          underlineColor: 'transparent', background: '#003489'
                        }
                      }}
                    />
                    :
                    <View>
                      <TextInput
                        label='6 DIGIT VERIFICATION CODE'
                        value={code}
                        onChangeText={value => { setVerificationCode(value) }}
                        placeholder='XXXXXX'
                        keyboardType='number-pad'
                        style={{ width: windowWidth * .8 }}
                        selectionColor='white'
                        left={<TextInput.Icon icon='numeric' style={{ fontSize: 24 }} />}
                        theme={{
                          colors: {
                            placeholder: 'white', text: 'white', primary: 'white',
                            underlineColor: 'transparent', background: '#003489'
                          }
                        }}
                      />
                      <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 5, marginTop: 15 }}>
                        Trouble verifying code?
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text onPress={() => {redirectToPhoneInput()}} style={{ textDecorationLine: 'underline', color: 'white', fontSize: 13, textAlign: 'center', marginBottom: 15 }}>
                          Re-enter phone number
                        </Text>
                        <Text onPress={() => {
                          codeResent(true);
                          resendCode();
                          setTimeout(() => {
                            codeResent(false)
                          }, 1500)
                          }} style={{ textDecorationLine: 'underline', color: resent ? 'gray' : 'white', fontSize: 13, textAlign: 'center', marginBottom: 15 }}>
                          Resend verification code
                        </Text>
                      </View>
                    </View>
                  }
              </View>
              {
                verificationId === null ?
                <Button
                  mode='contained'
                  onPress={() => {phoneInput(phone); updateCurrentLoad('sendVerification');}}
                  loading={currentLoad === 'sendVerification'}
                  disabled={phone.length < 10}
                  style={{ width: windowWidth * .8, backgroundColor: '#FAC832', borderRadius: 25 }}
                  textColor='#121212'
                >SEND VERIFICATION CODE</Button>
                :
                <Button
                  mode='contained'
                  onPress={() => {codeInput(code); updateCurrentLoad('confirmVerification');}}
                  loading={currentLoad === 'confirmVerification'}
                  disabled={code.length < 6}
                  style={{ width: windowWidth * .8, backgroundColor: '#FAC832', borderRadius: 25 }}
                  textColor='#121212'
                >CONFIRM VERIFICATION CODE</Button>
              }
            </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginPage;