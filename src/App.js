
import React , { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

import {
  AppRegistry
} from 'react-native';

import Router from './Router';
import { Provider } from 'react-redux';
import { store } from './Config/Redux/'; 


export default class App extends Component{
  render(){
    return(
    <Provider store={store}>
      <NavigationContainer>
      <Router/> 
      </NavigationContainer>
    </Provider>     

    )
  }
}

AppRegistry.registerComponent('app', () => HeadlessCheck);

