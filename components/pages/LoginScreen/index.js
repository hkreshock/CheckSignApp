import React, { useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';

// Main Component

function LoginPage({ props }) {
  const { phoneInput, verificationId, codeInput, userLoggedIn, profileInput, redirectToPhoneInput, resendCode } = props;

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello</Text>
    </View>
  );
}

export default LoginPage;