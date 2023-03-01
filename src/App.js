import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'
import RNPreventScreenshot from 'react-native-prevent-screenshot';
import { PermissionsAndroid } from 'react-native';

const requestPermission = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: 'Get Read External Storage Access',
      message: 'get read external storage access for detecting screenshots',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
};


const App = () => {
  requestPermission();
  return (
    
    <NavigationContainer>
      <Router />
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
