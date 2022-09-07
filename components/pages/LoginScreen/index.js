import React, { useState } from 'react';
import { View, Dimensions, ActivityIndicator, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { Image, Button, TextInput, Text } from 'react-native-paper';
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
      <StatusBar barStyle="light-content" />
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
                    left={<TextInput.Icon icon="account-box" style={{ fontSize: 24 }} />}
                    theme={{
                      colors: {
                        placeholder: 'white', text: 'white', primary: 'white',
                        underlineColor: 'transparent', background: '#003489'
                      }
                    }}
                  />
                  <Input
                    label='LAST NAME'
                    value={lastName}
                    onChangeText={value => { setLastName(value) }}
                    placeholder='Appleseed'
                    style={{ width: windowWidth * .8 }}
                    left={<TextInput.Icon icon='account-box' style={{ fontSize: 24 }} />}
                    theme={{
                      colors: {
                        placeholder: 'white', text: 'white', primary: 'white',
                        underlineColor: 'transparent', background: '#003489'
                      }
                    }}
                  />
                  <Input
                    label='MC NUMBER'
                    placeholder='XXXXXXX'
                    onChangeText={value => { setMC(value) }}
                    containerStyle={{ width: windowWidth * .8 }}
                    inputStyle={{ color: 'white' }}
                    labelStyle={{ color: 'white' }}
                    leftIcon={
                      <Icon
                        name='local-shipping'
                        size={24}
                        color='white'
                      />
                    }
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
                <View style={{ marginTop: 50 }}>
                  {
                    verificationId === null ?
                    <Input
                      label='PHONE NUMBER'
                      key={0}
                      placeholder='+1 999 999 9999'
                      keyboardType='phone-pad'
                      onChangeText={value => {updatePhone(value)}}
                      containerStyle={{ width: windowWidth * .8 }}
                      inputStyle={{ color: 'white' }}
                      labelStyle={{ color: 'white' }}
                      leftIcon={
                        <Icon
                          name='phone'
                          size={24}
                          color='white'
                        />
                      }
                    />
                    :
                    <View>
                      <Input
                        label='6 DIGIT VERIFICATION CODE'
                        key={1}
                        placeholder='XXXXXX'
                        keyboardType='number-pad'
                        onChangeText={value => {setVerificationCode(value)}}
                        containerStyle={{ width: windowWidth * .8 }}
                        inputStyle={{ color: 'white' }}
                        labelStyle={{ color: 'white' }}
                        leftIcon={
                          <Icon
                            name='fiber-pin'
                            size={24}
                            color='white'
                          />
                        }
                      />
                      <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 5 }}>
                        Trouble verifying code?
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text onPress={() => {redirectToPhoneInput()}} style={{ textDecorationLine: 'underline', color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 15 }}>
                          Re-enter phone number
                        </Text>
                        <Text onPress={() => {
                          codeResent(true);
                          resendCode();
                          setTimeout(() => {
                            codeResent(false)
                          }, 1500)
                          }} style={{ textDecorationLine: 'underline', color: resent ? 'gray' : 'white', fontSize: 14, textAlign: 'center', marginBottom: 15 }}>
                          Resend verification code
                        </Text>
                      </View>
                    </View>
                  }
              </View>
              {
                verificationId === null ?
                <Button
                  title='SEND VERIFICATION CODE'
                  titleStyle={{ color: '#121212' }}
                  disabledTitleStyle={{ color: 'rgb(140, 140, 140)' }}
                  containerStyle={{ width: windowWidth * .8, backgroundColor: '#FAC832', borderRadius: 25 }}
                  disabled={phone.length < 10}
                  type='standard'
                  onPress={() => {phoneInput(phone); updateCurrentLoad('sendVerification');}}
                  loading={currentLoad === 'sendVerification'}
                ></Button>
                :
                <Button
                  title='CONFIRM VERIFICATION CODE'
                  titleStyle={{ color: '#121212' }}
                  disabledTitleStyle={{ color: 'rgb(140, 140, 140)' }}
                  containerStyle={{ width: windowWidth * .8, backgroundColor: '#FAC832', borderRadius: 25 }}
                  disabled={code.length < 6}
                  type='standard'
                  onPress={() => {codeInput(code); updateCurrentLoad('confirmVerification');}}
                  loading={currentLoad === 'confirmVerification'}
                ></Button>
              }
            </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginPage;